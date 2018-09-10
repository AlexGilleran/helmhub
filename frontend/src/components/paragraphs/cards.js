import react from "react";
import RaisedButton from "material-ui/RaisedButton";
import styled from "styled-components";

import withBaseListHoc from "../hoc/base-list-hoc";
import ParagraphCard from "./paragraph-card";
import { addMargin } from "../../components/cards/card-styles";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-contents: center;
`;

const ButtonWrapper = addMargin(RaisedButton);

function Cards(props) {
  const paras = props.paragraph.list;
  const WrappedParaCard = props.paragraph.individualItem(ParagraphCard);

  return (
    <Wrapper>
      <For each="paragraph" of={paras} index="index">
        <WrappedParaCard
          key={paragraph.key}
          id={paragraph.key}
          onExpandChange={() => props.onExpandChange(index)}
          onDelete={
            paras.length > 1 && props.paragraph.delete.bind(null, index)
          }
          onUp={index > 0 && props.paragraph.moveUp.bind(null, index)}
          onDown={
            index < paras.length - 1 &&
            props.paragraph.moveDown.bind(null, index)
          }
        />
      </For>

      <ButtonWrapper onClick={props.paragraph.add} label="Add Paragraph" />
    </Wrapper>
  );
}

const placeholder = {
  heading: "",
  text: ""
};

export default path => withBaseListHoc("paragraph", path, placeholder, Cards);
