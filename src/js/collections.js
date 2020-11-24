import './imports';
import Header from '../components/Header/index.js'

;((doc) => {
    const oApp = doc.querySelector('#app');

    const init = () => {
        render();
    }

    function render() {
        const headerTpl = Header.tpl({
            url: '/index.html',
            title: '我的新闻',
            showLeftIcon: true,
            showRightIcon: false
        })

        oApp.innerHTML += headerTpl;
    }

    init();

})(document);