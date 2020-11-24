import loadingTpl from './index.tpl';
import './index.scss';

import { tplReplace } from '../../libs/utils';

export default {
    name: 'PageLoading',
    tpl() {
        return tplReplace(loadingTpl)
    }
}