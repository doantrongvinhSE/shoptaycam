import HomePage from "../pages/client/HomePage";
import NotFoundPage from "../pages/client/NotFoundPage/NotFoundPage";
import ProductDetailsPage from "../pages/client/ProductDetailsPage/ProductDetailsPage";
import TypeProductPage from "../pages/client/TypeProductPage/TypeProductPage";
import CartPage from "../pages/client/CartPage/CartPage";
import CheckoutPage from "../pages/client/CheckoutPage/CheckoutPage";
import ThankYouPage from "../pages/client/ThankYouPage/ThankYouPage";
import CategoryPage from "../components/CategoryPage/CategoryPage";

const routes = [
    {
        path: '/',
        page: HomePage,
        isShowHeader: true
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
        path: '/danh-muc/:categoryId',
        page: CategoryPage,
        isShowHeader: true
    },
    {
        path: '/cart',
        page: CartPage,
        isShowHeader: true
    },
    {
        path: '/checkout',
        page: CheckoutPage,
        isShowHeader: true
    },
    {
        path: '/thank-you',
        page: ThankYouPage,
        isShowHeader: true
    },
    {
        path: '*',
        page: NotFoundPage
    }
]

export default routes;