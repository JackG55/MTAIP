//<=============================PAGES==================>
import Home from '../components/pages/Home';
import Discovering from '../components/pages/Discovering';
import Create from '../components/pages/Create';

//<==============================LAYOUT=================>
import { CreateLayout } from '../components/Layout'

//dành cho những trang ko phải đăng nhập vẫn vào được
const publicRoutes = [
    { path: '/', component: Home},
    { path: '/discovering', component: Discovering},
    { path: '/create', component: Create, layout: CreateLayout},
];

//dành cho những trang phải đăng nhập mới vào được, nếu chưa đăng nhập sẽ lái sang trang login
const privateRoutes = [];

export { publicRoutes, privateRoutes };
