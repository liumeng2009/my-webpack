import ItemTpl from './tpl/item.tpl'
import wrapperTpl from './tpl/index.tpl'
import './index.scss'

import { tplReplace } from '../../libs/utils'

export default {
    name: 'NavBar',
    _currentIndex : 0,
    tpl (data) {
        let itemList = '';

        data.map(({ type, title }, index) => {
            itemList += tplReplace(ItemTpl, {
                isCurrent: index === 0 ? 'current' : '',
                title: title,
                type: type
            })
        })

        return tplReplace(wrapperTpl, {
            itemList: itemList,
            wrapper: .6 * data.length
        })
    },

    bindEvent(setType) {
        const oNavBar = document.querySelector('.nav');
        const oNavItems = document.querySelectorAll('.item');

        oNavBar.addEventListener('click', this._setNav.bind(this, oNavItems, setType), false)
    },

    _setNav(items, setType) {
        const tar = arguments[2].target;

        const className = tar.className.trim();

        if (className === 'item') {
            items[this._currentIndex].className = 'item';
            this._currentIndex = [].indexOf.call(items, tar)
            tar.className = 'item current';
            setType(items[this._currentIndex]);
        }
    }
}