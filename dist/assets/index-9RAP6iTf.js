(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))p(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const g of n.addedNodes)g.tagName==="LINK"&&g.rel==="modulepreload"&&p(g)}).observe(document,{childList:!0,subtree:!0});function s(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function p(r){if(r.ep)return;r.ep=!0;const n=s(r);fetch(r.href,n)}})();class N{constructor(t){this.shopName=t,this._products=[],this._customers=[],this._orders=[]}get products(){return this._products}get customers(){return this._customers}get orders(){return this._orders}addProduct(t){if(this._products.some(s=>s.id===t.id))throw new Error("exists");this._products.push(t),console.info("[Shop] product added",t.id)}registerCustomer(t){if(this._customers.some(s=>s.email===t.email))throw new Error("exists");this._customers.push(t),console.info("[Shop] customer registered",t.customerId)}processOrder(t){this._orders.push(t),console.info("[Shop] order processed",t.orderId)}searchProducts(t){return this._products.filter(s=>s.name.toLowerCase().includes(t.toLowerCase()))}}class m{constructor(t,s,p,r,n){this.id=t,this.name=s,this.price=p,this.stock=r,this.category=n}updatePrice(t){if(t<=0)throw new Error("Price must be > 0");this.price=t}addStock(t){if(t<=0)throw new Error("q > 0");this.stock+=t}reduceStock(t){if(t<=0||t>this.stock)throw new Error("invalid");this.stock-=t}isAvailable(){return this.stock>0}}class v{constructor(t,s,p,r,n=0){this.customerId=t,this.fullName=s,this.email=p,this.phoneNumber=r,this.bonusPoints=n,this.orders=[]}addBonus(t){if(t<=0)throw new Error(">0");this.bonusPoints+=t}useBonus(t){if(t<=0||t>this.bonusPoints)throw new Error("invalid");this.bonusPoints-=t}updateContactInfo(t,s){this.email=t,this.phoneNumber=s}getTotalOrders(){return this.orders.length}}var l=(o=>(o.ELECTRONICS="ELECTRONICS",o.CLOTHING="CLOTHING",o.BOOKS="BOOKS",o.FOOD="FOOD",o.HOME="HOME",o))(l||{}),u=(o=>(o.PENDING="PENDING",o.PROCESSING="PROCESSING",o.SHIPPED="SHIPPED",o.DELIVERED="DELIVERED",o.CANCELLED="CANCELLED",o))(u||{});class y{constructor(t,s){this.orderId=t,this.customerId=s,this.items=[],this.totalAmount=0,this.status=u.PENDING}addItem(t,s){if(!t.isAvailable()||s>t.stock)throw new Error("not enough");t.reduceStock(s),this.items.push({productId:t.id,quantity:s,unitPrice:t.price,totalPrice:t.price*s}),this.calc()}calc(){this.totalAmount=this.items.reduce((t,s)=>t+s.totalPrice,0)}updateStatus(t){this.status=t}}function $(){const o=document.getElementById("app"),t=new N("My Online Store");t.addProduct(new m("p1","Smartfon",500,15,l.ELECTRONICS)),t.addProduct(new m("p2","Noutbuk",1200,5,l.ELECTRONICS)),t.addProduct(new m("p3","Alkimyogar (kitob)",20,50,l.BOOKS)),t.addProduct(new m("p4","Kofe mashinasi",150,8,l.HOME)),t.addProduct(new m("p5","Klassik musiqa CD",10,30,l.MUSIC)),t.addProduct(new m("p6","Yoga mat",25,20,l.SPORTS)),t.addProduct(new m("p7","Klassik soat",200,12,l.ACCESSORIES)),t.addProduct(new m("p8","Klassik sumka",80,10,l.ACCESSORIES)),t.addProduct(new m("p9","Klassik kiyim",60,25,l.CLOTHING)),t.addProduct(new m("p10","Klassik poyabzal",90,18,l.CLOTHING)),t.addProduct(new m("p11","Klassik telefon",300,7,l.ELECTRONICS)),t.addProduct(new m("p12","Klassik televizor",400,4,l.ELECTRONICS)),t.addProduct(new m("p13","Klassik audio tizim",250,6,l.ELECTRONICS)),t.registerCustomer(new v("c1","Ali Valiyev","ali@example.com","+998901234567",120)),t.registerCustomer(new v("c2","Laylo Karimova","laylo@example.com","+998901234568",80)),t.registerCustomer(new v("c3","Anvar Murodov","anvar@example.com","+998901234569",200)),t.registerCustomer(new v("c4","Dilorom Qodirova","dilorom@example.com","+998901234570",150));const s=new y("o1","c1");s.addItem(t.products[0],1),t.processOrder(s);const p=new y("o2","c2");p.addItem(t.products[2],2),p.updateStatus(u.SHIPPED),t.processOrder(p);const r=new y("o3","c3");r.addItem(t.products[1],1),r.addItem(t.products[3],1),r.updateStatus(u.DELIVERED),t.processOrder(r);const n=new y("o4","c4");n.addItem(t.products[4],3),n.updateStatus(u.CANCELLED),t.processOrder(n),o.innerHTML=`
  <div class="min-h-screen flex">
    <aside class="w-64 bg-white shadow-sm">
      <div class="p-4 border-b"><h2 class="text-lg font-bold text-indigo-600">${t.shopName}</h2></div>
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
  `;function g(i){const e="inline-block px-2 py-1 rounded-full text-xs font-semibold";switch(i){case u.PENDING:return`<span class="${e} bg-gray-100 text-gray-700">Kutilmoqda</span>`;case u.PROCESSING:return`<span class="${e} bg-blue-100 text-blue-700">Qayta ishlanmoqda</span>`;case u.SHIPPED:return`<span class="${e} bg-indigo-100 text-indigo-700">Yuborildi</span>`;case u.DELIVERED:return`<span class="${e} bg-green-100 text-green-700">Yetkazildi</span>`;case u.CANCELLED:return`<span class="${e} bg-red-100 text-red-700">Bekor qilingan</span>`;default:return`<span class="${e} bg-gray-100 text-gray-700">${i}</span>`}}function P(){const i=document.getElementById("summary"),e=t.orders.reduce((c,d)=>c+d.totalAmount,0);t.products.filter(c=>c.stock<=5).length;const a=t.orders.length;i.innerHTML=`
      <div class="p-4 bg-white rounded shadow">Products<br/><strong>${t.products.length}</strong></div>
      <div class="p-4 bg-white rounded shadow">Customers<br/><strong>${t.customers.length}</strong></div>
      <div class="p-4 bg-white rounded shadow">Orders<br/><strong>${a}</strong></div>
      <div class="p-4 bg-white rounded shadow">Revenue<br/><strong>$${e}</strong></div>
    `}function C(){const i=document.getElementById("ordersTable");document.getElementById("ordersCount").textContent=String(t.orders.length),i.innerHTML=t.orders.map(e=>{const a=t.customers.find(d=>d.customerId===e.customerId),c=e.items.map(d=>{const h=t.products.find(w=>w.id===d.productId);return h?h.name+` x${d.quantity}`:d.productId}).join(", ");return`
        <tr class="border-b">
          <td class="py-2 px-3">${e.orderId}</td>
          <td class="py-2 px-3">${a?a.fullName:e.customerId}</td>
          <td class="py-2 px-3">${c}</td>
          <td class="py-2 px-3">${g(e.status)}</td>
          <td class="py-2 px-3">$${e.totalAmount}</td>
          <td class="py-2 px-3"><button class="view-order text-indigo-600" data-id="${e.orderId}">View</button></td>
        </tr>
      `}).join("")}function b(){P(),C(),console.info("[UI] rendered all (enhanced)")}b();const I=document.getElementById("orderModal"),E=document.getElementById("modalBody");function x(i){const e=t.orders.find(c=>c.orderId===i);if(!e)return;const a=t.customers.find(c=>c.customerId===e.customerId);E.innerHTML=`
      <div><strong>Order:</strong> ${e.orderId}</div>
      <div><strong>Customer:</strong> ${a?a.fullName:e.customerId}</div>
      <div class="mt-3">
        <strong>Items:</strong>
        <ul class="list-disc pl-6 mt-2">
          ${e.items.map(c=>`<li>${c.productId} — ${c.quantity} x $${c.unitPrice} = $${c.totalPrice}</li>`).join("")}
        </ul>
      </div>
      <div class="mt-3"><strong>Total:</strong> $${e.totalAmount}</div>
      <div class="mt-3"><strong>Status:</strong> ${g(e.status)}</div>
    `,I.classList.remove("hidden"),I.classList.add("flex")}function O(){I.classList.add("hidden"),I.classList.remove("flex")}document.addEventListener("click",i=>{const e=i.target;if(e.classList.contains("view-order")){const a=e.getAttribute("data-id");x(a)}}),document.getElementById("closeModal").addEventListener("click",O),document.getElementById("modalClose2").addEventListener("click",O),document.getElementById("changeStatusBtn").addEventListener("click",()=>{const i=E.querySelector("div").textContent.split(":")[1].trim(),e=t.orders.find(h=>h.orderId===i);if(!e)return;const a=[u.PENDING,u.PROCESSING,u.SHIPPED,u.DELIVERED],c=a.indexOf(e.status)>=0?a.indexOf(e.status):0,d=a[(c+1)%a.length];e.updateStatus(d),console.log("[ACTION] status changed",e.orderId,d),b(),x(e.orderId)}),document.getElementById("refundBtn").addEventListener("click",()=>{const i=E.querySelector("div").textContent.split(":")[1].trim(),e=t.orders.find(a=>a.orderId===i);e&&(e.updateStatus(u.CANCELLED),console.log("[ACTION] refund -> order cancelled",e.orderId),b(),x(e.orderId))}),document.getElementById("globalSearch").addEventListener("input",i=>{const e=i.target.value.trim();if(!e){C();return}const a=t.orders.filter(d=>d.orderId.includes(e)||d.customerId.includes(e)||d.items.some(h=>h.productId.includes(e))),c=document.getElementById("ordersTable");c.innerHTML=a.map(d=>{const h=t.customers.find(f=>f.customerId===d.customerId),w=d.items.map(f=>{const S=t.products.find(L=>L.id===f.productId);return S?S.name+` x${f.quantity}`:f.productId}).join(", ");return`
        <tr class="border-b">
          <td class="py-2 px-3">${d.orderId}</td>
          <td class="py-2 px-3">${h?h.fullName:d.customerId}</td>
          <td class="py-2 px-3">${w}</td>
          <td class="py-2 px-3">${g(d.status)}</td>
          <td class="py-2 px-3">$${d.totalAmount}</td>
          <td class="py-2 px-3"><button class="view-order text-indigo-600" data-id="${d.orderId}">View</button></td>
        </tr>
      `}).join("")}),document.getElementById("addProductBtn").addEventListener("click",()=>{const i="p"+(t.products.length+1),e=new m(i,"Yangi mahsulot "+i,99,10,l.HOME);t.addProduct(e),console.log("[ACTION] add product",e),b()})}$();
