import './imports';
import Header from '../components/Header/index.js';
import NavBar from '../components/NavBar/index.js';
import NewsList from '../components/NewsList/index.js';
import PageLoading from '../components/PageLoading/index.js';

import { NEWS_TYPE } from '../data';

import Service from '../services';
import { scrollToBottom } from '../libs/utils';

;((doc) => {
    const oApp = doc.querySelector('#app');
    let listWrapper = null;

    const config = {
        type: 'top',
        count: 10,
        pageNum: 0,
        isLoading: false
    }

    const newsData = {
        
    }

    const init = async () => {
        render();
        await getNewsData();
        bindEvent();
    }

    function render() {
        // header
        const headerTpl = Header.tpl({
            url: '/',
            title: '新闻头条',
            showLeftIcon: false,
            showRightIcon: true
        })

        oApp.innerHTML += headerTpl;
        // navbar
        const navbarTpl = NavBar.tpl(NEWS_TYPE)

        oApp.innerHTML += navbarTpl;

        // list
        const listWrapperTpl = NewsList.wrapperTpl(.82);

        oApp.innerHTML += listWrapperTpl;

        listWrapper = oApp.querySelector('.news-list');
    }

    function renderList (data) {
        const { pageNum } = config;
        const newListTpl = NewsList.tpl({
            data: data,
            pageNum: pageNum
        });
        listWrapper.innerHTML += newListTpl;
        NewsList.imgShow();
    }

    async function getNewsData() {
        const { type, count, pageNum } = config;

        config.isLoading = true;

        if (newsData[type]) {
            console.log('pool');
            renderList(newsData[type][pageNum]);
            return ;
        }
        console.log('request' + type);
        listWrapper.innerHTML = PageLoading.tpl();
        newsData[type] = await Service.getNewsList(type, count);
        listWrapper.innerHTML = '';

        renderList(newsData[type][pageNum]);

        config.isLoading = false;
    }

    function bindEvent() {
        NavBar.bindEvent((e) => {
            setType(e.dataset.type);
        });

        window.addEventListener('scroll', scrollToBottom.bind(null, getMoreList), false)
    }

    async function getMoreList() {
        if (!config.isLoading) {
            if (config.pageNum < 1) {
                config.pageNum ++;
                await getNewsData();
            }
        }
    }

    function setType(type) {
        config.type = type;
        config.pageNum = 0;
        console.log('切换type');
        listWrapper.innerHTML = '';
        getNewsData();
        console.log(newsData);
    }

    init();

})(document);