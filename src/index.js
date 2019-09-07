/**
 *@fileName index.js
 *@author   Like (likeaixi@gmail.com)
 *@date     2018/3/27
 *@disc
 */
import _ from 'lodash';
import "normalize.css"
import './css/index.css';
import "jquery";
import printMe from './js/print';













































if (module.hot) {
    module.hot.accept('./js/print.js', function () {
        console.log('Accepting the updated printMe module!');
        printMe();
    });
}

