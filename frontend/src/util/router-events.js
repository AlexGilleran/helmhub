import Router from 'next/router';
import Reactor from './event';

const reactor = new Reactor();

reactor.registerEvent('routeChangeStart');
Router.onRouteChangeStart = (...args) => {
	reactor.dispatchEvent('routeChangeStart', ...args);
}

export default reactor;