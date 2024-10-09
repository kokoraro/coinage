import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faSync, faCog, faStar, faList, faDollarSign, faPoundSign, faLongArrowAltRight, faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarReg } from '@fortawesome/free-regular-svg-icons';

export const iconLibrarySetup = () =>
    library.add(fab, faSync, faCog, faStar, faList, faDollarSign, faPoundSign, faLongArrowAltRight, faLongArrowAltLeft, faStarReg);
