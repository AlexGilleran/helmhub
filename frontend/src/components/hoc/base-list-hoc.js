import React from "react";
import Router from "next/router";
import styled from "styled-components";
import base from "../../config/base";
import debounce from "lodash/debounce";
import AuthHoc from "../hoc/auth-hoc-page";

import isEqual from "lodash/isEqual";
import set from "lodash/set";

export default (name, path, placeholder, Wrapped, defaultValue = []) =>
  AuthHoc(
    class withBaseList extends React.Component {
      constructor(props) {
        super(props);

        this.state = {
          list: []
        };
      }

      updateFirebaseDebounced = debounce(list => {
        base.post(`users/${this.props.user.uid}/${path}`, {
          data: list
        });
      }, 100);

      componentDidMount() {
        this.binding = base.syncState(`users/${this.props.user.uid}/${path}`, {
          context: this,
          state: "list",
          asArray: true,
          defaultValue: null,
          onFailure: err => {
            console.error(err);
          },
          then: () => {
            if (this.state.list === null) {
              this.setState(state => ({
                list: defaultValue
              }));
            }
          }
        });
      }

      shouldComponentUpdate(nextProps, nextState) {
        if (
          this.state.list &&
          this.state.list.length > 0 &&
          nextState.list &&
          nextState.list.length > 0
        ) {
          const oldIds = this.state.list.map(x => x.key);
          const newIds = nextState.list.map(x => x.key);

          return !isEqual(oldIds, newIds);
        } else {
          return true;
        }
      }

      componentWillUnmount() {
        if (this.binding) {
          base.removeBinding(this.binding);
        }
      }

      add() {
        this.setState(state => {
          return {
            list: state.list.concat([placeholder])
          };
        });
      }

      delete(index) {
        this.setState(state => {
          const list = state.list.concat([]);
          list.splice(index, 1);
          return {
            list
          };
        });
      }

      move(index, direction) {
        const delta = direction === "up" ? -1 : 1;

        this.setState(state => {
          const swapWithIndex = index + delta;

          if (swapWithIndex < 0 || swapWithIndex >= state.list.length) {
            return {};
          } else {
            const newList = state.list.concat([]);
            newList[swapWithIndex] = state.list[index];
            newList[index] = state.list[swapWithIndex];

            return {
              list: newList
            };
          }
        });
      }

      up(index) {
        this.move(index, "up");
      }

      down(index) {
        this.move(index, "down");
      }

      render() {
        const props = {
          ...this.props,
          [name]: {
            list: this.state.list,
            add: this.add.bind(this),
            delete: this.delete.bind(this),
            moveUp: this.up.bind(this),
            moveDown: this.down.bind(this),
            individualItem: individualItem(
              `users/${this.props.user.uid}/${path}`
            )
          }
        };

        return this.state.list !== null ? <Wrapped {...props} /> : null;
      }
    }
  );

const individualItem = path => Wrapped =>
  class IndividualItem extends React.Component {
    constructor(props) {
      super(props);

      this.state = {};
    }

    componentDidMount() {
      this.binding = base.syncState(`${path}/${this.props.id}`, {
        context: this,
        state: "item",
        onFailure: err => {
          console.error(err);
        }
      });
    }

    componentWillUnmount() {
      base.removeBinding(this.binding);
    }

    update(path, newValue) {
      this.setState(state => {
        const item = { ...state.item };

        set(item, path, newValue);

        return {
          item
        };
      });
    }

    render() {
      return (
        <Wrapped
          {...this.props}
          item={this.state.item}
          onChange={this.update.bind(this)}
        />
      );
    }
  };
