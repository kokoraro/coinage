import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faSync, faCog, faStar, faList } from '@fortawesome/free-solid-svg-icons'

export const iconLibrarySetup = () => library.add(fab, faSync, faCog, faStar, faList);