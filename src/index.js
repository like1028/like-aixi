/**
 *@fileName index.js
 *@author   Like (likeaixi@gmail.com)
 *@date     2018/3/27
 *@disc
 */
import _ from 'lodash';
import './css/style.css';
import img from './img/27.png';
import Data from './data/data';
import printMe from './js/print'
function component() {
    let element = document.createElement('div');
    let btn = document.createElement('button');
    // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.classList.add('hello');
    btn.innerHTML = 'Click me and check the console';
    btn.onclick = printMe;
    //将图像添加到div
    let myImg = new Image();
    myImg.src = img;

    element.appendChild(btn);

    console.log(Data);
    return element;
}

document.body.appendChild(component());

// if (module.hot) {
//     module.hot.accept('./print.js', function () {
//         console.log('Accepting the updated printMe module!');
//         printMe();
//     });
// }