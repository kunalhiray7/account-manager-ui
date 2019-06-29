import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });


const { JSDOM } = require('jsdom');

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

function copyProps(src, target) {
    const props = Object.getOwnPropertyNames(src)
        .filter(prop => typeof target[ prop ] === 'undefined')
        .reduce((result, prop) => ({
            ...result,
            [ prop ]: Object.getOwnPropertyDescriptor(src, prop),
        }), {});
    Object.defineProperties(target, props);
}

global.window = window;
global.document = window.document;
global.navigator = {
    userAgent: 'node.js',
};
copyProps(window, global);

function FormDataMock() {
    this.append = jest.fn();
}

global.FormData = FormDataMock;

// var localStorageMock = (function () {
//     var store = {};
//
//     return {
//         getItem: function (key) {
//             return store[ key ] || null;
//         },
//         setItem: function (key, value) {
//             store[ key ] = !!value && value.toString();
//         },
//         clear: function () {
//             store = {};
//         }
//     };
//
// })();
//
// Object.defineProperty(window, 'localStorage', {
//     value: localStorageMock
// });
