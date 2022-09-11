//<=============================PAGES==================>
import Home from '../components/pages/Home';
import Discovering from '../components/pages/Discovering';
import Create from '../components/pages/Create';
import Sign from '../components/pages/Sign';
import Detail from '../components/pages/Detail';

//<==============================LAYOUT=================>
import { CreateLayout } from '../components/Layout'

//dành cho những trang ko phải đăng nhập vẫn vào được
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/discovering', component: Discovering },
    { path: '/create', component: Create, layout: CreateLayout },
    { path: '/signup', component: Sign, layout: CreateLayout },
    { path: '/detail', component: Detail, layout: CreateLayout}
];

//dành cho những trang phải đăng nhập mới vào được, nếu chưa đăng nhập sẽ lái sang trang login
const privateRoutes = [];

export { publicRoutes, privateRoutes };