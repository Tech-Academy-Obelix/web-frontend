const routes = [
    {
        path: '/',
        component: () => import('src/layouts/MainLayout.vue'),
        children: [
            {
                path: '',
                name: 'index',
                component: () => import('src/pages/IndexPage.vue'),
            },
            {
                path: 'admin',
                name: 'admin',
                component: () => import('src/pages/AdminPage.vue'),
                meta: { requiredRole: 'admin' },
            },
            {
                path: 'classes/',
                name: 'classes',
                component: () => import('src/pages/ClassesPage.vue'),
            },
            {
                path: 'classes/:id',
                name: 'class',
                component: () => import('src/pages/ClassPage.vue'),
            },
        ],
        meta: { requiresAuthentication: true },
    },
    {
        path: '/',
        component: () => import('src/layouts/AuthLayout.vue'),
        children: [
            {
                path: 'login',
                name: 'login',
                component: () => import('pages/LoginPage.vue'),
            },
            {
                path: 'register',
                name: 'register',
                component: () => import('pages/RegisterPage.vue'),
            },
        ],
        meta: { requiresAnonymous: true },
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        path: '/:catchAll(.*)*',
        component: () => import('pages/ErrorNotFound.vue'),
    },
]

export default routes
