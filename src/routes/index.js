import HomePage from "../pages/client/HomePage";
import NotFoundPage from "../pages/client/NotFoundPage/NotFoundPage";
import ProductDetailsPage from "../pages/client/ProductDetailsPage/ProductDetailsPage";
import TypeProductPage from "../pages/client/TypeProductPage/TypeProductPage";

const routes = [
    {
        path: '/',
        page: HomePage,
        isShowHeader: false
    },
    {
        path: '/product/:id',
        page: ProductDetailsPage,
        isShowHeader: true
    },
    {
        path: '/danh-muc',
        page: TypeProductPage,
        isShowHeader: true
    },
    {
        path: '*',
        page: NotFoundPage
    }
]

export default routes;