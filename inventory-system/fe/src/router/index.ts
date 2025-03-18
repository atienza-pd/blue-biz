import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useEventBus } from '@/eventBus'

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
]

const orderRoutes = [
  {
    path: '/orders',
    name: 'orders',
    component: () => import('../domains/purchase/PurchaseOrdersView.vue'),
  },
  {
    path: '/orders/:id',
    name: 'order-detail',
    component: () => import('../domains/purchase/PurchaseOrderDetailView.vue'),
  },
  {
    path: '/orders/:orderId/items/:id',
    name: 'item-detail',
    component: () => import('../domains/purchase/PurchaseOrderItemDetail.vue'),
  },
]

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
})

router.beforeEach((to, from, next) => {
  const { emit } = useEventBus();
  if (to.name === 'item-detail') {
    const orderId = to.params.orderId
    if (!orderId || orderId === 'new' || orderId === 'null') {
      emit('alert', {
        type: 'error',
        message: 'Order ID is required',
      })
      next({ name: 'not-found' })
      return
    }
  }
  next()
})

export default router
