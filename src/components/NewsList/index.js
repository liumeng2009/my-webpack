import wrapperTpl from './tpl/wrapper.tpl';
import tpl0 from './tpl/tpl0.tpl';
import tpl1 from './tpl/tpl1.tpl';
import tpl2 from './tpl/tpl2.tpl';
import tpl3 from './tpl/tpl3.tpl';

import './index.scss';

import { tplReplace } from '../../libs/utils'

export default {
    name: 'NewsList',
    wrapperTpl(top) {
        return tplReplace(wrapperTpl, {
            top: top
        })
    },

    tpl(options) {
        const { data, pageNum } = options;

        let list = '';
        let tpl = '';

        data.map((item, index) => {
            if (!item.thumbnail_pic_s) {
                tpl = tpl0;
            } else if (!item.thumbnail_pic_s02 && !item.thumbnail_pic_s03){
                tpl = tpl1;
            } else if (!item.thumbnail_pic_s03) {
                tpl = tpl2;
            } else {
                tpl = tpl3;
            }

            list += tplReplace(tpl, {
                pageNum,
                index,
                uniqueKey: item.uniqueKey,
                url: item.url,
                title: item.title,
                author: item.author_name,
                date: item.date,
                thumbnail_pic_s: item.thumbnail_pic_s,
                thumbnail_pic_s02: item.thumbnail_pic_s02,
                thumbnail_pic_s03: item.thumbnail_pic_s03
            })
        });

        return list;
        
    },

    imgShow() {
        const oImgs = document.querySelector('img');
        [...oImgs].map( img => {
            img.onload = function() {
                img.style.opacity = '1';
            }
        })
    }

    
}