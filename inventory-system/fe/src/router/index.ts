import ExampleView from '@/components/examples/ExampleView.vue';
import { useEventBus } from '@/shared/event-bus/event-bus';
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const catalogRoutes = [
  {
    path: '/catalog',
    name: 'catalog',
    component: () => import(`../domains/catalogs/CatalogView.vue`),
  },
  {
    path: '/catalog/products',
    name: 'products',
    component: () => import(`../domains/catalogs/products/ProductsView.vue`),
  },
  {
    path: '/catalog/products/:id',
    name: 'product-detail',
    component: () => import(`../domains/catalogs/products/ProductDetailView.vue`),
  },
  {
    path: '/catalog/suppliers',
    name: 'suppliers',
    component: () => import(`../domains/catalogs/suppliers/SuppliersView.vue`),
  },
  {
    path: '/catalog/suppliers/:id',
    name: 'supplier-detail',
    component: () => import(`../domains/catalogs/suppliers/SupplierDetailView.vue`),
  },
  {
    path: '/catalog/addresses',
    name: 'addresses',
    component: () => import(`../domains/catalogs/addresses/AddressesView.vue`),
  },
];

const orderRoutes = [
  {
    path: '/orders',
    name: 'orders',
    component: () => import('../domains/purchases/orders/OrdersView.vue'),
  },
  {
    path: '/orders/:id',
    name: 'order-detail',
    component: () => import('../domains/purchases/orders/OrderDetailView.vue'),
  },
  {
    path: '/orders/:id/items/:itemid',
    name: 'item-detail',
    component: () => import('../domains/purchases/order-items/OrderItemDetail.vue'),
  },
];

const examplesRoutes: RouteRecordRaw[] = [
  {
    path: '/examples',
    name: 'examples',
    component: ExampleView,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    ...catalogRoutes,
    ...orderRoutes,
    ...examplesRoutes,
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/contact',
      name: 'contact',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ContactView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const { emit } = useEventBus();
  if (from.name === 'item-detail') {
    const orderId = from.params.id;
    if (!orderId || orderId === 'new' || orderId === 'null') {
      emit('alert', {
        type: 'error',
        message: 'Please save the purchase order first before adding items',
      });
      next({ name: 'orders' });
      return;
    }
  }
  next();
});

export default router;
