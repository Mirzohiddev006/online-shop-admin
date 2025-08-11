import { Shop } from '../store/shop'
import { Product } from '../models/product'
import { Customer } from '../models/customer'
import { Order } from '../models/order'
import { ProductCategory, OrderStatus } from '../models/enums'

export function startApp() {
  const root = document.getElementById('app')!
  const shop = new Shop('My Online Store')

  // Seed sample data
  shop.addProduct(new Product('p1', 'Smartfon', 500, 15, ProductCategory.ELECTRONICS))
  shop.addProduct(new Product('p2', 'Noutbuk', 1200, 5, ProductCategory.ELECTRONICS))
  shop.addProduct(new Product('p3', "Alkimyogar (kitob)", 20, 50, ProductCategory.BOOKS))
  shop.addProduct(new Product('p4', 'Kofe mashinasi', 150, 8, ProductCategory.HOME))
  shop.addProduct(new Product('p5', 'Klassik musiqa CD', 10, 30, ProductCategory.MUSIC))
  shop.addProduct(new Product('p6', 'Yoga mat', 25, 20, ProductCategory.SPORTS))  
  shop.addProduct(new Product('p7', 'Klassik soat', 200, 12, ProductCategory.ACCESSORIES))
  shop.addProduct(new Product('p8', 'Klassik sumka', 80, 10, ProductCategory.ACCESSORIES))
  shop.addProduct(new Product('p9', 'Klassik kiyim', 60, 25, ProductCategory.CLOTHING))
  shop.addProduct(new Product('p10', 'Klassik poyabzal', 90, 18, ProductCategory.CLOTHING))
  shop.addProduct(new Product('p11', 'Klassik telefon', 300, 7, ProductCategory.ELECTRONICS))
  shop.addProduct(new Product('p12', 'Klassik televizor', 400, 4, ProductCategory.ELECTRONICS))
  shop.addProduct(new Product('p13', 'Klassik audio tizim', 250, 6, ProductCategory.ELECTRONICS))

  shop.registerCustomer(new Customer('c1', 'Ali Valiyev', 'ali@example.com', '+998901234567', 120))
  shop.registerCustomer(new Customer('c2', 'Laylo Karimova', 'laylo@example.com', '+998901234568', 80))
  shop.registerCustomer(new Customer('c3', 'Anvar Murodov', 'anvar@example.com', '+998901234569', 200))
  shop.registerCustomer(new Customer('c4', 'Dilorom Qodirova', 'dilorom@example.com', '+998901234570', 150))

  const order1 = new Order('o1', 'c1')
  order1.addItem(shop.products[0], 1)
  shop.processOrder(order1)

  const order2 = new Order('o2', 'c2')
  order2.addItem(shop.products[2], 2)
  order2.updateStatus(OrderStatus.SHIPPED)
  shop.processOrder(order2)

  const order3 = new Order('o3', 'c3')
  order3.addItem(shop.products[1], 1)
  order3.addItem(shop.products[3], 1)
  order3.updateStatus(OrderStatus.DELIVERED)
  shop.processOrder(order3)

  const order4 = new Order('o4', 'c4')
  order4.addItem(shop.products[4], 3)
  order4.updateStatus(OrderStatus.CANCELLED)
  shop.processOrder(order4)

  // Render base layout (sidebar, topbar, controls)
  root.innerHTML = `
  <div class="min-h-screen flex">
    <aside class="w-64 bg-white shadow-sm">
      <div class="p-4 border-b"><h2 class="text-lg font-bold text-indigo-600">${shop.shopName}</h2></div>
      <nav class="p-4">
        <ul class="space-y-2">
          <li><button data-nav="dashboard" class="w-full text-left px-3 py-2 rounded hover:bg-gray-50">Dashboard</button></li>
          <li><button data-nav="products" class="w-full text-left px-3 py-2 rounded hover:bg-gray-50">Products</button></li>
          <li><button data-nav="orders" class="w-full text-left px-3 py-2 rounded hover:bg-gray-50">Orders</button></li>
          <li><button data-nav="customers" class="w-full text-left px-3 py-2 rounded hover:bg-gray-50">Customers</button></li>
        </ul>
      </nav>
    </aside>

    <main class="flex-1 p-6">
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center gap-4">
          <input id="globalSearch" placeholder="Qidiruv..." class="px-3 py-2 border rounded w-80" />
          <button id="addProductBtn" class="px-3 py-2 bg-indigo-600 text-white rounded">Mahsulot qo'shish</button>
        </div>
        <div class="flex items-center gap-4">
          <div class="text-sm">Admin</div>
          <div class="w-8 h-8 bg-gray-300 rounded-full"></div>
        </div>
      </div>

      <!-- KPI cards -->
      <div id="summary" class="grid grid-cols-4 gap-4 mb-6"></div>

      <!-- Orders table with enhanced UI -->
      <section class="bg-white rounded-xl shadow p-4">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold">Buyurtmalar</h3>
          <div class="text-sm text-gray-500">Jami: <span id="ordersCount">0</span></div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left table-auto">
            <thead>
              <tr class="text-sm text-gray-600 bg-gray-50">
                <th class="py-2 px-3">ID</th>
                <th class="py-2 px-3">Mijoz</th>
                <th class="py-2 px-3">Mahsulotlar</th>
                <th class="py-2 px-3">Holat</th>
                <th class="py-2 px-3">Summa</th>
                <th class="py-2 px-3">Amallar</th>
              </tr>
            </thead>
            <tbody id="ordersTable" class="text-sm"></tbody>
          </table>
        </div>
      </section>

      <!-- Order detail modal (hidden) -->
      <div id="orderModal" class="fixed inset-0 bg-black bg-opacity-40 hidden items-center justify-center">
        <div class="bg-white rounded-lg w-11/12 md:w-2/3 lg:w-1/2 p-6 shadow-lg">
          <div class="flex justify-between items-center mb-4">
            <h4 class="text-lg font-semibold">Buyurtma ma'lumotlari</h4>
            <button id="closeModal" class="text-gray-500">✕</button>
          </div>
          <div id="modalBody"></div>
          <div class="mt-4 flex justify-end gap-2">
            <button id="changeStatusBtn" class="px-3 py-2 bg-yellow-500 text-white rounded">Holatni o'zgartirish</button>
            <button id="refundBtn" class="px-3 py-2 bg-red-500 text-white rounded">To'lovni qaytarish</button>
            <button id="modalClose2" class="px-3 py-2 border rounded">Yopish</button>
          </div>
        </div>
      </div>

    </main>
  </div>
  `

  // Render functions
  function formatStatusBadge(status: OrderStatus) {
    const base = 'inline-block px-2 py-1 rounded-full text-xs font-semibold'
    switch (status) {
      case OrderStatus.PENDING: return `<span class="${base} bg-gray-100 text-gray-700">Kutilmoqda</span>`
      case OrderStatus.PROCESSING: return `<span class="${base} bg-blue-100 text-blue-700">Qayta ishlanmoqda</span>`
      case OrderStatus.SHIPPED: return `<span class="${base} bg-indigo-100 text-indigo-700">Yuborildi</span>`
      case OrderStatus.DELIVERED: return `<span class="${base} bg-green-100 text-green-700">Yetkazildi</span>`
      case OrderStatus.CANCELLED: return `<span class="${base} bg-red-100 text-red-700">Bekor qilingan</span>`
      default: return `<span class="${base} bg-gray-100 text-gray-700">${status}</span>`
    }
  }

  function renderSummary() {
    const el = document.getElementById('summary')!
    const revenue = shop.orders.reduce((s, o) => s + o.totalAmount, 0)
    const lowStock = shop.products.filter(p => p.stock <= 5).length
    const recentOrders = shop.orders.length

    el.innerHTML = `
      <div class="p-4 bg-white rounded shadow">Products<br/><strong>${shop.products.length}</strong></div>
      <div class="p-4 bg-white rounded shadow">Customers<br/><strong>${shop.customers.length}</strong></div>
      <div class="p-4 bg-white rounded shadow">Orders<br/><strong>${recentOrders}</strong></div>
      <div class="p-4 bg-white rounded shadow">Revenue<br/><strong>$${revenue}</strong></div>
    `
  }

  function renderOrders() {
    const body = document.getElementById('ordersTable')!
    document.getElementById('ordersCount')!.textContent = String(shop.orders.length)

    body.innerHTML = shop.orders.map(o => {
      const customer = shop.customers.find(c => c.customerId === o.customerId)
      const productNames = o.items.map(i => {
        const prod = shop.products.find(p => p.id === i.productId)
        return prod ? prod.name + ` x${i.quantity}` : i.productId
      }).join(', ')

      return `
        <tr class="border-b">
          <td class="py-2 px-3">${o.orderId}</td>
          <td class="py-2 px-3">${customer ? customer.fullName : o.customerId}</td>
          <td class="py-2 px-3">${productNames}</td>
          <td class="py-2 px-3">${formatStatusBadge(o.status)}</td>
          <td class="py-2 px-3">$${o.totalAmount}</td>
          <td class="py-2 px-3"><button class="view-order text-indigo-600" data-id="${o.orderId}">View</button></td>
        </tr>
      `
    }).join('')
  }

  function renderAll() { renderSummary(); renderOrders(); console.info('[UI] rendered all (enhanced)') }
  renderAll()

  // Modal helpers
  const orderModal = document.getElementById('orderModal')!
  const modalBody = document.getElementById('modalBody')!
  function openModalWithOrder(orderId: string) {
    const order = shop.orders.find(o => o.orderId === orderId)
    if (!order) return
    const customer = shop.customers.find(c => c.customerId === order.customerId)
    modalBody.innerHTML = `
      <div><strong>Order:</strong> ${order.orderId}</div>
      <div><strong>Customer:</strong> ${customer ? customer.fullName : order.customerId}</div>
      <div class="mt-3">
        <strong>Items:</strong>
        <ul class="list-disc pl-6 mt-2">
          ${order.items.map(i => `<li>${i.productId} — ${i.quantity} x $${i.unitPrice} = $${i.totalPrice}</li>`).join('')}
        </ul>
      </div>
      <div class="mt-3"><strong>Total:</strong> $${order.totalAmount}</div>
      <div class="mt-3"><strong>Status:</strong> ${formatStatusBadge(order.status)}</div>
    `
    orderModal.classList.remove('hidden')
    orderModal.classList.add('flex')
  }

  function closeModal() { orderModal.classList.add('hidden'); orderModal.classList.remove('flex') }

  document.addEventListener('click', (e) => {
    const t = e.target as HTMLElement
    if (t.classList.contains('view-order')) {
      const id = t.getAttribute('data-id')!
      openModalWithOrder(id)
    }
  })

  document.getElementById('closeModal')!.addEventListener('click', closeModal)
  document.getElementById('modalClose2')!.addEventListener('click', closeModal)

  // Change status button (cycles through statuses)
  document.getElementById('changeStatusBtn')!.addEventListener('click', () => {
    const orderId = modalBody.querySelector('div')!.textContent!.split(':')[1].trim()
    const order = shop.orders.find(o => o.orderId === orderId)
    if (!order) return
    const sequence = [OrderStatus.PENDING, OrderStatus.PROCESSING, OrderStatus.SHIPPED, OrderStatus.DELIVERED]
    const idx = sequence.indexOf(order.status) >= 0 ? sequence.indexOf(order.status) : 0
    const next = sequence[(idx + 1) % sequence.length]
    order.updateStatus(next)
    console.log('[ACTION] status changed', order.orderId, next)
    renderAll()
    openModalWithOrder(order.orderId)
  })

  // Refund (simple demo) — marks payment refunded by setting order status CANCELLED
  document.getElementById('refundBtn')!.addEventListener('click', () => {
    const orderId = modalBody.querySelector('div')!.textContent!.split(':')[1].trim()
    const order = shop.orders.find(o => o.orderId === orderId)
    if (!order) return
    order.updateStatus(OrderStatus.CANCELLED)
    console.log('[ACTION] refund -> order cancelled', order.orderId)
    renderAll()
    openModalWithOrder(order.orderId)
  })

  // Search
  document.getElementById('globalSearch')!.addEventListener('input', (e: Event) => {
    const q = (e.target as HTMLInputElement).value.trim()
    if (!q) { renderOrders(); return }
    const results = shop.orders.filter(o => o.orderId.includes(q) || o.customerId.includes(q) || o.items.some(i => i.productId.includes(q)))
    const body = document.getElementById('ordersTable')!
    body.innerHTML = results.map(o => {
      const customer = shop.customers.find(c => c.customerId === o.customerId)
      const productNames = o.items.map(i => {
        const prod = shop.products.find(p => p.id === i.productId)
        return prod ? prod.name + ` x${i.quantity}` : i.productId
      }).join(', ')
      return `
        <tr class="border-b">
          <td class="py-2 px-3">${o.orderId}</td>
          <td class="py-2 px-3">${customer ? customer.fullName : o.customerId}</td>
          <td class="py-2 px-3">${productNames}</td>
          <td class="py-2 px-3">${formatStatusBadge(o.status)}</td>
          <td class="py-2 px-3">$${o.totalAmount}</td>
          <td class="py-2 px-3"><button class="view-order text-indigo-600" data-id="${o.orderId}">View</button></td>
        </tr>
      `
    }).join('')
  })

  // Add product quick action
  document.getElementById('addProductBtn')!.addEventListener('click', () => {
    const id = 'p' + (shop.products.length + 1)
    const newP = new Product(id, 'Yangi mahsulot ' + id, 99, 10, ProductCategory.HOME)
    shop.addProduct(newP)
    console.log('[ACTION] add product', newP)
    renderAll()
  })
}
