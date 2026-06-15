import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "./config.js";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const $ = (id) => document.getElementById(id);
const money = new Intl.NumberFormat("es-SV", { style: "currency", currency: "USD" });
const EXTERNAL_SITE_URL = "https://www.zonadigitalsv.com/";
const IS_DESKTOP_APP = navigator.userAgent.includes("Electron");
const DESKTOP_ONLY_VIEWS = IS_DESKTOP_APP ? ["ahorrosv"] : [];
const WEB_AHORRO_ENABLED = IS_DESKTOP_APP;

const ROLE_VIEWS = {
  Administrador: ["dashboard", "sale", "products", "stock", ...DESKTOP_ONLY_VIEWS, "users", "reports"],
  Colaborador: ["sale", "products"],
  Supervisor: ["dashboard", "sale", "products", "stock", ...DESKTOP_ONLY_VIEWS, "reports"],
  Cajero: ["sale", "products"],
};

const CATEGORY_ZONES = [
  {
    zone: "Zona Gamer",
    groups: [
      { name: "Consolas", icon: "🎮", items: ["Playstation", "Nintendo", "XBOX"], defaults: { unit: "unidad", pack: "unidad", size: 1 } },
      { name: "Equipos Gamer", icon: "🖥️", items: ["Laptops Gamer", "PC Gamer"], defaults: { unit: "unidad", pack: "unidad", size: 1 } },
      { name: "Accesorios Gamer", icon: "🎧", items: ["Gaming Keyboards", "Gaming Mouse", "Gaming Headset", "Gaming Chairs", "Gaming Mousepad", "Gamepads"], defaults: { unit: "unidad", pack: "unidad", size: 1 } },
      { name: "Streaming", icon: "🎙️", items: ["Microfono PC", "WebCams"], defaults: { unit: "unidad", pack: "caja", size: 1 } },
    ],
  },
  {
    zone: "Zona Computo",
    groups: [
      { name: "Almacenamiento", icon: "💾", items: ["Memorias USB", "Memorias TFlash", "Memorias SD", "Discos Externos", "Enclosures"], defaults: { unit: "memoria", pack: "display", size: 12 } },
      { name: "Imagen", icon: "🖥️", items: ["Monitores", "Accesorios para Pantallas", "Cables para Pantallas"], defaults: { unit: "unidad", pack: "caja", size: 1 } },
      { name: "Equipos", icon: "💻", items: ["PC Desktop", "Laptops"], defaults: { unit: "unidad", pack: "unidad", size: 1 } },
      { name: "Proteccion", icon: "🔋", items: ["UPS", "Reguladores", "Baterias"], defaults: { unit: "unidad", pack: "caja", size: 1 } },
      { name: "Perifericos", icon: "🖱️", items: ["Mouse USB Opticos", "Teclados", "Mouse Inalambricos", "Bocinas para PC", "Audifonos para PC", "Mousepads"], defaults: { unit: "unidad", pack: "caja", size: 1 } },
      { name: "Accesorios", icon: "🔌", items: ["Accesorios para PC", "Cables Computo", "Accesorios para Laptop", "Adaptadores Computo", "Bolsones y Estuches"], defaults: { unit: "unidad", pack: "paquete", size: 10 } },
    ],
  },
  {
    zone: "Zona Hardware",
    groups: [
      { name: "Microprocesadores", icon: "🧠", items: ["Procesadores Intel", "Procesadores AMD"], defaults: { unit: "unidad", pack: "caja", size: 1 } },
      { name: "Enfriamiento", icon: "🌀", items: ["Enfriamiento por Aire", "Enfriamiento Liquido", "Ventilacion para Case", "Pasta Termica"], defaults: { unit: "unidad", pack: "caja", size: 1 } },
      { name: "Componentes", icon: "🎛️", items: ["Tarjetas de Video", "Fuentes de Poder", "Cases", "Tarjetas PCI"], defaults: { unit: "unidad", pack: "caja", size: 1 } },
      { name: "Storage", icon: "💽", items: ["Discos Duros", "Unidades SSD Sata", "Unidades SSD M.2"], defaults: { unit: "disco", pack: "caja", size: 1 } },
      { name: "Motherboards", icon: "🧩", items: ["Motherboards INTEL", "Motherboards AMD"], defaults: { unit: "unidad", pack: "caja", size: 1 } },
      { name: "Memorias RAM", icon: "📟", items: ["Ram para PC", "Ram para Laptop"], defaults: { unit: "unidad", pack: "blister", size: 1 } },
    ],
  },
  {
    zone: "Zona Redes",
    groups: [
      { name: "Seguridad", icon: "📹", items: ["Unidades DVR-NVR", "Camaras de Vigilancia"], defaults: { unit: "camara", pack: "caja", size: 1 } },
      { name: "Unidades de Red", icon: "📡", items: ["Access Point", "Routers", "Switch de Red", "Extensores de Red"], defaults: { unit: "unidad", pack: "caja", size: 1 } },
      { name: "Tarjetas de Red", icon: "📶", items: ["Tarjetas de Red PCI", "Tarjetas de Red USB"], defaults: { unit: "adaptador", pack: "blister", size: 1 } },
      { name: "Varios para Red", icon: "🔵", items: ["Accesorios para Redes", "Cables de Red"], defaults: { unit: "cable", pack: "paquete", size: 10 } },
    ],
  },
  {
    zone: "Zona Electronica",
    groups: [
      { name: "Video", icon: "📺", items: ["Smart TV"], defaults: { unit: "unidad", pack: "unidad", size: 1 } },
      { name: "Camaras", icon: "📷", items: ["Camara de Accion"], defaults: { unit: "camara", pack: "caja", size: 1 } },
      { name: "Juguetes", icon: "🕹️", items: ["Juguetes RC", "Coleccionables"], defaults: { unit: "unidad", pack: "caja", size: 1 } },
      { name: "Audio", icon: "🎚️", items: ["Cables de Audio", "Adaptadores de Audio"], defaults: { unit: "cable", pack: "paquete", size: 10 } },
      { name: "Smart Home", icon: "🏠", items: ["Smart Home"], defaults: { unit: "unidad", pack: "caja", size: 1 } },
      { name: "Herramientas", icon: "🧰", items: ["Herramientas", "Herramientas de Red"], defaults: { unit: "unidad", pack: "caja", size: 1 } },
    ],
  },
  {
    zone: "Zona Movil",
    groups: [
      { name: "Celulares", icon: "📱", items: ["Cargadores para Celular", "Accesorios para Moviles", "Celulares", "Cables Celular Tipo C", "Accesorios Apple"], defaults: { unit: "unidad", pack: "caja", size: 1 } },
      { name: "Tablets", icon: "🔲", items: ["Tablets"], defaults: { unit: "unidad", pack: "caja", size: 1 } },
      { name: "Gadgets", icon: "⌚", items: ["Accesorios para Carro", "Bocinas Portatiles", "Smartwatch", "Varios Electronicos"], defaults: { unit: "unidad", pack: "caja", size: 1 } },
      { name: "Audifonos", icon: "🎧", items: ["Earphones 3.5MM", "Earphones Bluetooth", "Headphones Bluetooth"], defaults: { unit: "audifono", pack: "caja", size: 1 } },
    ],
  },
  {
    zone: "Zona Home Office",
    groups: [
      { name: "Impresoras", icon: "🖨️", items: ["Impresoras de Tanque", "Impresoras Termicas", "Scaners", "Accesorios de Impresion"], defaults: { unit: "unidad", pack: "caja", size: 1 } },
      { name: "Consumibles", icon: "🧴", items: ["Cartuchos de Tinta", "Cintas", "Tintas Refill", "Papeleria", "Limpieza"], defaults: { unit: "unidad", pack: "paquete", size: 1 } },
      { name: "Mobiliario", icon: "🪑", items: ["Escritorios"], defaults: { unit: "unidad", pack: "unidad", size: 1 } },
      { name: "Calculadoras", icon: "🧮", items: ["Calculadoras Basicas", "Calculadoras Cientificas"], defaults: { unit: "unidad", pack: "caja", size: 1 } },
    ],
  },
];

let selectedCategoryZone = CATEGORY_ZONES[1].zone;

const SERVICE_COMPANIES = ["Claro SV", "Tigo SV", "Movistar SV", "Digicel SV"];
const COMPANY_COLORS = {
  "Claro SV": "#d71920",
  "Tigo SV": "#174ea6",
  "Movistar SV": "#019df4",
  "Digicel SV": "#00843d",
};

let state = {
  session: null,
  user: null,
  products: [],
  services: [],
  cash: null,
  profiles: [],
  closures: [],
  reports: { summary: { tickets: 0, sold: 0, profit: 0 }, sales: [], sale_items: [], top_products: [], low_stock: [] },
  cart: [],
  selectedProductId: null,
  saleDiscount: 0,
};

const emailForUsername = (username) => username.includes("@") ? username.toLowerCase() : `${username.toLowerCase()}@pos.local`;
const fmt = (n) => money.format(Number(n || 0));
const normalizeRole = (role) => {
  const value = String(role || "").trim().toLowerCase();
  if (value.includes("admin")) return "Administrador";
  if (value.includes("colab") || value.includes("cajero")) return "Colaborador";
  if (value.includes("super")) return "Supervisor";
  return role || "Colaborador";
};
const userRole = () => normalizeRole(state.user?.role || state.user?.username || state.user?.name);
const isAdmin = () => userRole() === "Administrador";
const allowedViews = () => ROLE_VIEWS[userRole()] || ["sale", "products"];
const canUseView = (name) => allowedViews().includes(name);
const defaultView = () => allowedViews()[0] || "sale";
const canManageProducts = () => isAdmin();
const CACHE_KEY = "tech_pos_cache_v1";
const QUEUE_KEY = "tech_pos_offline_queue_v1";
const ONLINE_TIMEOUT_MS = 9000;
const EMPTY_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 60'%3E%3Crect width='80' height='60' rx='8' fill='%23eef2f7'/%3E%3Cpath d='M20 42h40L49 30l-8 8-6-6-15 10Z' fill='%23cbd5e1'/%3E%3Ccircle cx='29' cy='25' r='5' fill='%23cbd5e1'/%3E%3C/svg%3E";
let realtimeChannel = null;
let refreshTimer = null;
let refreshInFlight = false;
let pollTimer = null;
let ahorroInitialized = false;
let inventoryAlertFilter = "all";
let activeReportTab = "summary";

const listen = (id, event, handler) => {
  const element = $(id);
  if (element) element.addEventListener(event, handler);
};

function readJson(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key) || "") || fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function offlineQueue() {
  return readJson(QUEUE_KEY, []);
}

function setOfflineQueue(items) {
  writeJson(QUEUE_KEY, items);
  renderSyncStatus();
}

function queueOfflineChange(change) {
  const queue = offlineQueue();
  queue.push({
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
    ...change,
  });
  setOfflineQueue(queue);
  saveCache();
}

function pendingOfflineCash() {
  return 0;
}

function saveCache() {
  writeJson(CACHE_KEY, {
    saved_at: new Date().toISOString(),
    user: state.user,
    products: state.products,
    profiles: state.profiles,
    reports: state.reports,
  });
}

function loadCache() {
  return readJson(CACHE_KEY, null);
}

function applyCachedState(cached) {
  if (!cached?.user) return false;
  state.user = cached.user;
  state.products = cached.products || [];
  state.profiles = cached.profiles || [state.user];
  state.reports = { ...state.reports, ...(cached.reports || {}), sale_items: cached.reports?.sale_items || [] };
  return true;
}

function isOnline() {
  return navigator.onLine !== false;
}

function withTimeout(promise, label, ms = ONLINE_TIMEOUT_MS) {
  return Promise.race([
    Promise.resolve(promise),
    new Promise((_, reject) => setTimeout(() => reject(new Error(`${label} tardo demasiado`)), ms)),
  ]);
}

function safeImageUrl(url, fallback = EMPTY_IMAGE) {
  const raw = String(url || "").trim();
  if (!raw) return fallback;
  if (raw.startsWith("data:image/") || raw.startsWith("blob:")) return raw;
  try {
    const parsed = new URL(raw, window.location.href);
    const host = parsed.hostname.toLowerCase();
    const isLoopback = host === "localhost" || host === "127.0.0.1" || host === "::1" || host.startsWith("127.");
    if (isLoopback || parsed.protocol === "file:") return fallback;
    if (window.location.protocol === "https:" && parsed.protocol !== "https:") return fallback;
    return parsed.href;
  } catch {
    return fallback;
  }
}

function profileFromSession(session) {
  const metadata = session?.user?.user_metadata || {};
  const email = session?.user?.email || "";
  const username = metadata.username || email.split("@")[0] || "usuario";
  const fallbackRole = username.toLowerCase() === "admin" || email.toLowerCase().startsWith("admin@")
    ? "Administrador"
    : "Colaborador";
  return {
    id: session?.user?.id,
    name: metadata.name || username,
    username,
    role: normalizeRole(metadata.role || metadata.user_role || fallbackRole),
    active: true,
  };
}

function renderSyncStatus() {
  if (!$("syncStatus")) return;
  const queue = offlineQueue();
  const status = isOnline() ? "Online" : "Sin internet";
  $("syncStatus").textContent = `${status}${queue.length ? ` - ${queue.length} cambio(s) pendiente(s)` : " - sincronizado"}`;
  $("syncStatus").classList.toggle("offline", !isOnline() || queue.length > 0);
}

function scheduleRefresh(reason = "cambio remoto") {
  if (!state.session || !isOnline()) return;
  clearTimeout(refreshTimer);
  refreshTimer = setTimeout(async () => {
    if (refreshInFlight) return scheduleRefresh(reason);
    refreshInFlight = true;
    try {
      await refresh();
      renderSyncStatus();
    } catch (err) {
      console.warn(`No se pudo actualizar por ${reason}`, err);
    } finally {
      refreshInFlight = false;
    }
  }, 700);
}

function setupRefreshPulse() {
  clearInterval(pollTimer);
  if (!state.session) return;
  pollTimer = setInterval(async () => {
    if (document.hidden || !isOnline()) return;
    await syncOfflineSales();
    scheduleRefresh("sincronizacion periodica");
  }, 10000);
}

function setupRealtime() {
  if (realtimeChannel || !state.session) return;
  realtimeChannel = supabase
    .channel("pos-live-sync")
    .on("postgres_changes", { event: "*", schema: "public", table: "products" }, () => scheduleRefresh("productos"))
    .on("postgres_changes", { event: "*", schema: "public", table: "sales" }, () => scheduleRefresh("ventas"))
    .on("postgres_changes", { event: "*", schema: "public", table: "sale_items" }, () => scheduleRefresh("detalle de ventas"))
    .on("postgres_changes", { event: "*", schema: "public", table: "stock_movements" }, () => scheduleRefresh("inventario"))
    .subscribe((status) => {
      if (status === "SUBSCRIBED") renderSyncStatus();
    });
}

async function teardownRealtime() {
  clearInterval(pollTimer);
  pollTimer = null;
  if (!realtimeChannel) return;
  await supabase.removeChannel(realtimeChannel);
  realtimeChannel = null;
}

function toast(msg) {
  $("toast").textContent = msg;
  $("toast").classList.add("show");
  setTimeout(() => $("toast").classList.remove("show"), 2600);
}

async function requireOk(result) {
  if (result.error) throw result.error;
  return result.data;
}

function unitsText(product) {
  const packs = Math.floor(product.stock / product.pack_size);
  const loose = product.stock % product.pack_size;
  return `${product.stock} ${product.unit_name} (${packs} ${product.pack_name}${loose ? ` + ${loose}` : ""})`;
}

function modeData(product, mode) {
  if (mode === "pack") {
    return {
      mode,
      label: product.pack_name,
      units: product.pack_size,
      price: Number(product.pack_price),
      cost: Number(product.purchase_price) * product.pack_size,
    };
  }
  return {
    mode: "unit",
    label: product.unit_name,
    units: 1,
    price: Number(product.sale_price),
    cost: Number(product.purchase_price),
  };
}

function cartUnits(productId) {
  return state.cart
    .filter(item => item.item_type !== "service" && item.product_id === productId)
    .reduce((sum, item) => sum + item.units_per_sale * item.qty, 0);
}

function totals() {
  const subtotal = state.cart.reduce((sum, item) => sum + item.unit_price * item.qty, 0);
  const cost = state.cart.reduce((sum, item) => sum + item.unit_cost * item.qty, 0);
  const discount = Math.min(Math.max(0, Number(state.saleDiscount || 0)), subtotal);
  const taxable = Math.max(0, subtotal - discount);
  const tax = taxable * 0.13;
  return { subtotal, discount, taxable, tax, cost, total: taxable + tax, profit: taxable - cost };
}

function localDate(value) {
  return new Date(value).toLocaleDateString("en-CA");
}

function localDateTime(value) {
  return new Date(value).toLocaleString("es-SV");
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function inventoryTotals() {
  return state.products.reduce((acc, product) => {
    const stock = Number(product.stock || 0);
    const cost = Number(product.purchase_price || 0) * stock;
    const revenue = Number(product.sale_price || 0) * stock;
    acc.cost += cost;
    acc.revenue += revenue;
    acc.profit += revenue - cost;
    return acc;
  }, { cost: 0, revenue: 0, profit: 0 });
}

function todaysProductSales() {
  const today = new Date().toLocaleDateString("en-CA");
  const saleIds = new Set(state.reports.sales
    .filter(sale => localDate(sale.created_at) === today)
    .map(sale => sale.id));
  return productSummaryForSales(saleIds);
}

function productRowHtml(product) {
  const name = product.product_name || product.name;
  const visual = product.image_url
    ? `<img src="${safeImageUrl(product.image_url)}" alt="${name}">`
    : serviceImage(name.split(" - ")[0]);
  return `
    <div class="top-product">
      ${visual}
      <div><b>${name}</b><br>${product.units} unidades - ${fmt(product.profit)} ganancia</div>
    </div>`;
}

function productSoldUnits(productId) {
  return (state.reports.sale_items || [])
    .filter(item => item.product_id === productId)
    .reduce((sum, item) => sum + item.qty * item.units_per_sale, 0);
}

function categoryBadge(value) {
  const parts = categoryParts(value);
  if (!parts.item) return "";
  return `<span class="category-badge">${parts.zone || "Inventario"} / ${parts.group || "General"} / <b>${parts.item}</b></span>`;
}

function categoryShort(value) {
  const parts = categoryParts(value);
  return parts.item || parts.group || parts.zone || "Sin categoria";
}

function brandFromProduct(product) {
  const name = String(product?.name || "").trim();
  const known = ["ASUS", "Logitech", "Redragon", "Sony", "Samsung", "NVIDIA", "LG", "Kingston", "SanDisk", "HP", "Dell", "Lenovo", "Apple", "Xiaomi", "TP-Link", "Ugreen"];
  return known.find(brand => name.toLowerCase().includes(brand.toLowerCase())) || name.split(/\s+/)[0] || "General";
}

function stockStatus(product) {
  const stock = Number(product.stock || 0);
  const min = Number(product.min_stock || 0);
  if (stock <= 0) return { label: "Sin stock", cls: "out" };
  if (stock <= min) return { label: "Stock bajo", cls: "low" };
  return { label: "En stock", cls: "ok" };
}

function stockBadge(product) {
  const stock = Number(product.stock || 0);
  const status = stockStatus(product);
  return `<span class="sale-stock ${status.cls}">Stock: ${stock}</span>`;
}

function productMargin(product) {
  return Number(product.sale_price || 0) - Number(product.purchase_price || 0);
}

function daysUntilExpiration(product) {
  if (!product.expiration_date) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const expires = new Date(`${product.expiration_date}T00:00:00`);
  return Math.ceil((expires - today) / 86400000);
}

function expirationText(product) {
  const days = daysUntilExpiration(product);
  if (days === null) return "Sin fecha";
  if (days < 0) return `Vencido hace ${Math.abs(days)} dias`;
  if (days === 0) return "Vence hoy";
  return `${product.expiration_date} (${days} dias)`;
}

function productThumb(product) {
  return `<img class="thumb" src="${safeImageUrl(product?.image_url)}" alt="${product?.name || "Producto"}">`;
}

function companyBadge(company) {
  const color = COMPANY_COLORS[company] || "#0f766e";
  return `<span class="company-dot" style="--company:${color}">${company}</span>`;
}

function serviceImage(company) {
  const initial = (company || "S").slice(0, 1);
  const color = COMPANY_COLORS[company] || "#0f766e";
  return `<span class="service-thumb" style="--company:${color}">${initial}</span>`;
}

function saleItemVisual(item) {
  if (item.mode === "service") {
    const company = item.product_name.split(" - ")[0];
    return serviceImage(company);
  }
  return productThumb(item.product);
}

function enterApp() {
  $("login").classList.add("hidden");
  $("app").classList.remove("hidden");
  const today = new Date();
  const start = addDays(today, -6);
  if ($("reportStartDate") && !$("reportStartDate").value) $("reportStartDate").value = dateKey(start);
  if ($("reportEndDate") && !$("reportEndDate").value) $("reportEndDate").value = dateKey(today);
  if ($("dashboardStartDate") && !$("dashboardStartDate").value) $("dashboardStartDate").value = dateKey(start);
  if ($("dashboardEndDate") && !$("dashboardEndDate").value) $("dashboardEndDate").value = dateKey(today);
  renderAll();
  renderSyncStatus();
}

async function bootstrap() {
  const cached = loadCache();
  const { data } = await withTimeout(supabase.auth.getSession(), "Sesion", 6000).catch(() => ({ data: { session: null } }));
  state.session = data.session;
  if (!state.session) {
    $("login").classList.remove("hidden");
    $("app").classList.add("hidden");
    return;
  }

  if (cached?.user) {
    applyCachedState(cached);
    enterApp();
  }

  try {
    state.user = await requireOk(await withTimeout(supabase.from("profiles").select("*").eq("id", state.session.user.id).single(), "Perfil"));
  } catch (err) {
    if (!applyCachedState(cached)) {
      state.user = profileFromSession(state.session);
      state.profiles = [state.user];
      toast("Perfil tardó en cargar: usando la sesión local");
    }
  }
  if (cached) applyCachedState({ ...cached, user: state.user || cached.user });
  enterApp();
  if (!isOnline()) {
    toast("Sin internet: usando datos guardados");
    return;
  }
  setupRealtime();
  setupRefreshPulse();
  syncOfflineSales().catch(err => console.warn("No se pudo sincronizar offline al iniciar", err));
  refresh().catch(err => {
    console.warn("No se pudo sincronizar al iniciar", err);
    toast("Conexion lenta: mostrando datos guardados");
  });
}

async function refresh(options = {}) {
  const viewBeforeRefresh = currentView();
  const cached = loadCache();
  try {
    state.products = await requireOk(await withTimeout(supabase.from("products").select("*").order("name"), "Productos"));
  } catch (err) {
    if (!cached) throw err;
    state.products = cached.products || [];
    toast("Modo sin internet: usando productos guardados");
  }

  try {
    if (isAdmin()) {
      state.profiles = await requireOk(await withTimeout(supabase.from("profiles").select("*").order("name"), "Usuarios"));
    } else {
      state.profiles = [state.user];
    }
  } catch (err) {
    console.warn("No se pudieron cargar usuarios", err);
    state.profiles = cached?.profiles || [state.user];
  }

  try {
    await loadReports();
  } catch (err) {
    console.warn("No se pudieron cargar reportes", err);
    state.reports = cached?.reports || state.reports;
  }
  saveCache();
  renderAll();
  if (options.preserveView && canUseView(viewBeforeRefresh)) {
    showView(viewBeforeRefresh, { silent: true });
  }
  renderSyncStatus();
}

async function loadReports() {
  const sales = await requireOk(await withTimeout(supabase.from("sales").select("*").order("created_at", { ascending: false }).limit(200), "Ventas"));
  const saleIds = sales.map(sale => sale.id).filter(Boolean);
  const items = saleIds.length
    ? await requireOk(await withTimeout(supabase.from("sale_items").select("*").in("sale_id", saleIds), "Detalle de ventas"))
    : [];
  const summary = sales.reduce((acc, sale) => {
    acc.tickets += 1;
    acc.sold += Number(sale.total);
    acc.profit += Number(sale.profit);
    return acc;
  }, { tickets: 0, sold: 0, profit: 0 });

  const topMap = new Map();
  items.forEach((item) => {
    const product = state.products.find(p => p.id === item.product_id);
    const row = topMap.get(item.product_name) || {
      product_name: item.product_name,
      image_url: safeImageUrl(product?.image_url),
      units: 0,
      sold: 0,
      profit: 0,
    };
    row.units += item.qty * item.units_per_sale;
    row.sold += Number(item.line_total);
    row.profit += Number(item.line_total) - Number(item.line_cost);
    topMap.set(item.product_name, row);
  });

  state.reports = {
    summary,
    sales,
    sale_items: items,
    top_products: [...topMap.values()].sort((a, b) => b.units - a.units).slice(0, 10),
    low_stock: state.products.filter(p => p.stock <= p.min_stock),
  };
}

function renderAll() {
  $("roleText").textContent = `${state.user.name} - ${userRole()}`;
  applyRolePermissions();
  setupAhorroView();
  renderCategoryPicker();
  renderDashboard();
  renderProducts();
  renderCart();
  renderReportControls();
  renderReports();
  renderSelectedStockProduct();
}

function categoryPath(zone, group, item) {
  return `${zone} > ${group} > ${item}`;
}

function categoryParts(value) {
  const parts = String(value || "").split(">").map(part => part.trim()).filter(Boolean);
  return { zone: parts[0] || "", group: parts[1] || "", item: parts[2] || parts[0] || "" };
}

function activeCategoryZone() {
  return CATEGORY_ZONES.find(entry => entry.zone === selectedCategoryZone) || CATEGORY_ZONES[0];
}

function defaultsForCategory(value) {
  const parts = categoryParts(value);
  const zone = CATEGORY_ZONES.find(entry => entry.zone === parts.zone);
  const group = zone?.groups.find(entry => entry.name === parts.group);
  return group?.defaults || { unit: "unidad", pack: "unidad", size: 1 };
}

function setCategoryValue(value, applyDefaults = true) {
  if (!$("category")) return;
  setSelectValue("category", value || "");
  const parts = categoryParts(value);
  if (parts.zone) selectedCategoryZone = parts.zone;
  if ($("selectedCategoryText")) $("selectedCategoryText").textContent = value || "Selecciona zona, grupo y tipo de producto";
  if (applyDefaults && value) {
    const defaults = defaultsForCategory(value);
    setSelectValue("unitName", defaults.unit);
    setSelectValue("packName", defaults.pack);
    if (!$("packSize").value || Number($("packSize").value) === 1) $("packSize").value = defaults.size;
    calculatePurchaseUnitPrice();
  }
  renderCategoryPicker();
}

function renderCategoryPicker() {
  if (!$("categoryZoneTabs") || !$("categoryGroupGrid")) return;
  const current = $("category")?.value || "";
  const parts = categoryParts(current);
  const activeZone = activeCategoryZone();
  $("categoryZoneTabs").innerHTML = CATEGORY_ZONES.map(zone => `
    <button type="button" class="${zone.zone === activeZone.zone ? "active" : ""}" data-zone="${zone.zone}">
      ${zone.zone}
    </button>`).join("");
  $("categoryGroupGrid").innerHTML = activeZone.groups.map(group => `
    <article class="category-group ${parts.group === group.name ? "selected" : ""}">
      <button type="button" class="category-group-head" data-group="${group.name}">
        <span class="category-icon">${group.icon}</span>
        <b>${group.name}</b>
      </button>
      <div class="category-items">
        ${group.items.map(item => {
          const path = categoryPath(activeZone.zone, group.name, item);
          return `<button type="button" class="${current === path ? "active" : ""}" data-category="${path}">${item}</button>`;
        }).join("")}
      </div>
    </article>`).join("");
  $("categoryZoneTabs").querySelectorAll("[data-zone]").forEach(button => {
    button.addEventListener("click", () => {
      selectedCategoryZone = button.dataset.zone;
      renderCategoryPicker();
    });
  });
  $("categoryGroupGrid").querySelectorAll("[data-group]").forEach(button => {
    button.addEventListener("click", () => {
      const first = activeZone.groups.find(group => group.name === button.dataset.group)?.items[0];
      if (first) setCategoryValue(categoryPath(activeZone.zone, button.dataset.group, first));
    });
  });
  $("categoryGroupGrid").querySelectorAll("[data-category]").forEach(button => {
    button.addEventListener("click", () => setCategoryValue(button.dataset.category));
  });
}

function setupAhorroView() {
  const frame = $("ahorroFrame");
  const webview = $("ahorroWebview");
  const button = document.querySelector('aside button[data-view="ahorrosv"]');
  if (button) button.hidden = !IS_DESKTOP_APP || !canUseView("ahorrosv");
  if (IS_DESKTOP_APP && window.techPOS?.openZonaDigital) {
    if (frame) frame.classList.add("hidden");
    if (webview) webview.classList.add("hidden");
    ahorroInitialized = true;
    return;
  }
  if (!WEB_AHORRO_ENABLED) return;
  if (!frame || !webview) return;
  frame.classList.add("hidden");
  webview.classList.remove("hidden");
  if (!ahorroInitialized) {
    webview.setAttribute("src", EXTERNAL_SITE_URL);
  }
  ahorroInitialized = true;
}

function activeAhorroGuest() {
  const webview = $("ahorroWebview");
  if (webview && !webview.classList.contains("hidden") && typeof webview.executeJavaScript === "function") return webview;
  return null;
}

async function searchAhorro(productName) {
  if (!WEB_AHORRO_ENABLED) return toast("Zona Digital esta disponible en la app EXE");
  showView("ahorrosv");
  if (window.techPOS?.openZonaDigital) {
    window.techPOS.openZonaDigital(productName || "");
    return;
  }
  const guest = activeAhorroGuest();
  if (!guest) {
    $("ahorroFrame").src = EXTERNAL_SITE_URL;
    return;
  }
  guest.setAttribute("src", EXTERNAL_SITE_URL);
}

async function extractAhorroProduct() {
  const guest = activeAhorroGuest();
  if (!guest) throw new Error("La importacion directa funciona en la app EXE con Zona Digital abierto");
  return await guest.executeJavaScript(`
    (() => {
      const clean = (value) => String(value || '').replace(/\\s+/g, ' ').trim();
      const title = clean(document.querySelector('h1')?.innerText)
        || clean(document.querySelector('[class*="title" i]')?.innerText)
        || clean(document.title).replace(/Zona Digital.*/i, '');
      const bodyText = document.body.innerText || '';
      const priceMatch = bodyText.match(/\\$\\s*([0-9]+(?:[.,][0-9]{2})?)/);
      const price = priceMatch ? Number(priceMatch[1].replace(',', '.')) : 0;
      const image = [...document.images]
        .map(img => img.currentSrc || img.src)
        .filter(Boolean)
        .find(src => !/logo|icon|favicon/i.test(src)) || '';
      const crumb = [...document.querySelectorAll('a, span')]
        .map(el => clean(el.innerText))
        .filter(text => text && text.length < 40 && !/inicio|volver|compartir|visitar/i.test(text));
      const category = crumb.length > 1 ? crumb[crumb.length - 2] : 'Otros';
      return { title, price, image, category, url: location.href };
    })();
  `);
}

async function importAhorroToInventory() {
  try {
    const data = await extractAhorroProduct();
    if (!data?.title) return toast("No pude detectar el nombre del producto");
    resetProductForm();
    $("code").value = `ZD-${Date.now()}`;
    $("name").value = data.title;
    setCategoryValue(data.category || "Zona Computo > Accesorios > Accesorios para PC", false);
    setSelectValue("unitName", "unidad");
    setSelectValue("packName", "unidad");
    $("packSize").value = 1;
    $("purchasePackPrice").value = 0;
    $("purchasePrice").value = 0;
    $("salePrice").value = Number(data.price || 0).toFixed(2);
    $("packPrice").value = Number(data.price || 0).toFixed(2);
    $("stock").value = "";
    $("minStock").value = 0;
    if (data.image) {
      $("preview").src = data.image;
      $("preview").classList.add("show");
    }
    showView("stock");
    $("stock").focus();
    toast("Producto importado. Solo falta agregar stock y guardar.");
  } catch (err) {
    toast(err.message);
  }
}

function currentView() {
  const active = document.querySelector(".view.active");
  return active?.id?.replace("View", "") || "dashboard";
}

function applyRolePermissions() {
  document.body.classList.toggle("limited-products", !canManageProducts());
  document.querySelectorAll("aside button[data-view]").forEach((button) => {
    button.hidden = !canUseView(button.dataset.view);
  });
  if (!canUseView(currentView())) showView(defaultView(), { silent: true });
}

function dateKey(date) {
  return date.toLocaleDateString("en-CA");
}

function addDays(date, amount) {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + amount);
  return copy;
}

function dateLabel(key) {
  const date = new Date(`${key}T00:00:00`);
  return date.toLocaleDateString("es-SV", { day: "2-digit", month: "short" }).replace(".", "");
}

function dateRangeFromInputs(startId, endId, fallbackDays = 7) {
  const today = new Date();
  const fallbackStart = addDays(today, -(fallbackDays - 1));
  const startValue = $(startId)?.value || dateKey(fallbackStart);
  const endValue = $(endId)?.value || dateKey(today);
  const start = new Date(`${startValue}T00:00:00`);
  const end = new Date(`${endValue}T23:59:59`);
  if (start > end) return { start: end, end: start, days: Math.max(1, Math.round((start - end) / 86400000) + 1), label: `${endValue} - ${startValue}` };
  return { start, end, days: Math.max(1, Math.round((end - start) / 86400000) + 1), label: `${startValue} - ${endValue}` };
}

function salesInRange(range, offset = 0) {
  const sales = state.reports.sales || [];
  const span = Math.max(1, range.days || 1);
  const end = addDays(range.end, -offset * span);
  const start = addDays(range.start, -offset * span);
  return sales.filter(sale => {
    const date = new Date(sale.created_at);
    return date >= start && date <= end;
  });
}

function dashboardSummary(sales) {
  const ids = new Set(sales.map(sale => sale.id));
  const items = (state.reports.sale_items || []).filter(item => ids.has(item.sale_id));
  const total = sales.reduce((sum, sale) => sum + Number(sale.total || 0), 0);
  const units = items.reduce((sum, item) => sum + Number(item.qty || 0) * Number(item.units_per_sale || 1), 0);
  return { total, tickets: sales.length, units, average: sales.length ? total / sales.length : 0, items };
}

function percentChange(current, previous) {
  if (!previous && !current) return "0%";
  if (!previous) return "+100%";
  const value = ((current - previous) / previous) * 100;
  return `${value >= 0 ? "+" : ""}${value.toFixed(1)}%`;
}

function trendHtml(current, previous, label = "vs periodo anterior") {
  const diff = percentChange(current, previous);
  const good = !diff.startsWith("-");
  return `<span class="${good ? "up" : "down"}">${good ? "▲" : "▼"} ${diff} ${label}</span>`;
}

function lineChartHtml(points, metric) {
  const width = 720;
  const height = 240;
  const pad = 36;
  const max = Math.max(1, ...points.map(point => point.value));
  const xFor = (index) => pad + (index * (width - pad * 2)) / Math.max(1, points.length - 1);
  const yFor = (value) => height - pad - (value / max) * (height - pad * 2);
  const path = points.map((point, index) => `${index ? "L" : "M"}${xFor(index)},${yFor(point.value)}`).join(" ");
  const area = `${path} L${xFor(points.length - 1)},${height - pad} L${pad},${height - pad} Z`;
  const valueLabel = (value) => metric === "sales" ? fmt(value) : String(value);
  return `
    <svg viewBox="0 0 ${width} ${height}" role="img">
      <defs><linearGradient id="lineFill" x1="0" x2="0" y1="0" y2="1"><stop stop-color="#2563eb" stop-opacity=".18"/><stop offset="1" stop-color="#2563eb" stop-opacity="0"/></linearGradient></defs>
      ${[0, .25, .5, .75, 1].map(step => `<line x1="${pad}" x2="${width - pad}" y1="${pad + step * (height - pad * 2)}" y2="${pad + step * (height - pad * 2)}" />`).join("")}
      <path class="line-area" d="${area}"></path>
      <path class="line-path" d="${path}"></path>
      ${points.map((point, index) => `<circle cx="${xFor(index)}" cy="${yFor(point.value)}" r="4"></circle><text x="${xFor(index)}" y="${yFor(point.value) - 12}" text-anchor="middle">${valueLabel(point.value)}</text><text class="axis" x="${xFor(index)}" y="${height - 8}" text-anchor="middle">${dateLabel(point.key)}</text>`).join("")}
    </svg>`;
}

function donutStyle(rows, colors) {
  const total = rows.reduce((sum, row) => sum + row.value, 0) || 1;
  let acc = 0;
  const stops = rows.map((row, index) => {
    const start = acc;
    acc += (row.value / total) * 100;
    return `${colors[index % colors.length]} ${start}% ${acc}%`;
  }).join(", ");
  return `background: conic-gradient(${stops});`;
}

function renderLegend(rows, colors, total, valueFormatter = (n) => n) {
  return rows.map((row, index) => {
    const pct = total ? ((row.value / total) * 100).toFixed(0) : "0";
    return `<div><i style="background:${colors[index % colors.length]}"></i><span>${row.label}</span><b>${pct}%</b><em>${valueFormatter(row.value)}</em></div>`;
  }).join("") || `<p class="empty-state">Sin datos.</p>`;
}

function dashboardDailyPoints(sales, days, metric) {
  const count = days || 7;
  const today = new Date();
  const keys = Array.from({ length: count }, (_, index) => dateKey(addDays(today, index - count + 1)));
  const map = new Map(keys.map(key => [key, { key, value: 0 }]));
  const saleIds = new Set(sales.map(sale => sale.id));
  const unitsBySale = new Map();
  (state.reports.sale_items || []).filter(item => saleIds.has(item.sale_id)).forEach(item => {
    unitsBySale.set(item.sale_id, (unitsBySale.get(item.sale_id) || 0) + Number(item.qty || 0) * Number(item.units_per_sale || 1));
  });
  sales.forEach(sale => {
    const key = localDate(sale.created_at);
    if (!map.has(key)) map.set(key, { key, value: 0 });
    const point = map.get(key);
    if (metric === "orders") point.value += 1;
    else if (metric === "units") point.value += unitsBySale.get(sale.id) || 0;
    else point.value += Number(sale.total || 0);
  });
  return [...map.values()].sort((a, b) => a.key.localeCompare(b.key));
}

function renderDashboard() {
  const range = dateRangeFromInputs("dashboardStartDate", "dashboardEndDate", 7);
  const sales = salesInRange(range, 0);
  const previousSales = salesInRange(range, 1);
  const current = dashboardSummary(sales);
  const previous = dashboardSummary(previousSales);
  const products = state.products || [];
  const outStock = products.filter(product => Number(product.stock || 0) <= 0);
  const lowStock = products.filter(product => Number(product.stock || 0) > 0 && Number(product.stock || 0) <= Number(product.min_stock || 0));
  const inStock = products.filter(product => Number(product.stock || 0) > Number(product.min_stock || 0));
  const colors = ["#2563eb", "#22c55e", "#6d42d9", "#f59e0b", "#ef4444"];
  const metric = $("dashboardMetric")?.value || "sales";

  if ($("dashSold")) $("dashSold").textContent = fmt(current.total);
  if ($("dashTickets")) $("dashTickets").textContent = current.tickets;
  if ($("dashUnitsSold")) $("dashUnitsSold").textContent = current.units;
  if ($("dashCustomers")) $("dashCustomers").textContent = state.profiles.length || 1;
  if ($("dashAverageTicket")) $("dashAverageTicket").textContent = fmt(current.average);
  if ($("dashSalesTrend")) $("dashSalesTrend").innerHTML = trendHtml(current.total, previous.total);
  if ($("dashOrdersTrend")) $("dashOrdersTrend").innerHTML = trendHtml(current.tickets, previous.tickets);
  if ($("dashUnitsTrend")) $("dashUnitsTrend").innerHTML = trendHtml(current.units, previous.units);
  if ($("dashAverageTrend")) $("dashAverageTrend").innerHTML = trendHtml(current.average, previous.average);
  if ($("dashCustomersTrend")) $("dashCustomersTrend").textContent = `${state.profiles.length || 1} usuario(s) activos`;

  if ($("salesLineChart")) $("salesLineChart").innerHTML = lineChartHtml(dashboardDailyPoints(sales, range.days, metric), metric);

  const saleIds = new Set(sales.map(sale => sale.id));
  const categoryRows = [];
  current.items.forEach(item => {
    const product = products.find(entry => entry.id === item.product_id);
    const label = categoryShort(product?.category || "Otros");
    const row = categoryRows.find(entry => entry.label === label) || { label, value: 0 };
    row.value += Number(item.line_total || 0);
    if (!categoryRows.includes(row)) categoryRows.push(row);
  });
  categoryRows.sort((a, b) => b.value - a.value);
  if ($("categoryDonut")) $("categoryDonut").setAttribute("style", donutStyle(categoryRows.slice(0, 5), colors));
  if ($("categoryLegend")) $("categoryLegend").innerHTML = renderLegend(categoryRows.slice(0, 5), colors, current.total, fmt);

  const topMap = new Map();
  current.items.forEach(item => {
    const row = topMap.get(item.product_name) || { label: item.product_name, units: 0 };
    row.units += Number(item.qty || 0) * Number(item.units_per_sale || 1);
    topMap.set(item.product_name, row);
  });
  const topRows = [...topMap.values()].sort((a, b) => b.units - a.units).slice(0, 5);
  if ($("topProductsDash")) $("topProductsDash").innerHTML = topRows.map((row, index) => `<div><b>${index + 1}</b><span>${row.label}</span><strong>${row.units} uds.</strong></div>`).join("") || `<p class="empty-state">Sin productos vendidos.</p>`;

  const inventoryRows = [
    { label: "En stock", value: inStock.length },
    { label: "Stock bajo", value: lowStock.length },
    { label: "Sin stock", value: outStock.length },
  ];
  if ($("inventoryDonut")) $("inventoryDonut").setAttribute("style", donutStyle(inventoryRows, ["#22c55e", "#f59e0b", "#ef4444"]));
  if ($("inventoryStatusList")) $("inventoryStatusList").innerHTML = renderLegend(inventoryRows, ["#22c55e", "#f59e0b", "#ef4444"], products.length, (n) => n);

  const paymentRows = ["Efectivo", "Tarjeta", "Transferencia"].map(label => ({
    label,
    value: sales.filter(sale => sale.payment_method === label).reduce((sum, sale) => sum + Number(sale.total || 0), 0),
  })).filter(row => row.value > 0);
  if ($("paymentDonut")) $("paymentDonut").setAttribute("style", donutStyle(paymentRows, ["#2563eb", "#22c55e", "#6d42d9"]));
  if ($("paymentLegend")) $("paymentLegend").innerHTML = renderLegend(paymentRows, ["#2563eb", "#22c55e", "#6d42d9"], current.total, fmt);

  if ($("dashboardAlerts")) $("dashboardAlerts").innerHTML = [
    { tone: "red", title: `${outStock.length} productos sin stock`, text: "Productos agotados.", action: "Ver en inventario", type: "out" },
    { tone: "amber", title: `${lowStock.length} productos con stock bajo`, text: "Revisa y reabastece pronto.", action: "Reabastecer", type: "low" },
    { tone: "blue", title: `${offlineQueue().length} cambios pendientes`, text: "Esperando sincronizacion.", action: "Ver estado", type: "sync" },
  ].map(alert => `<div class="${alert.tone}"><i></i><div><b>${alert.title}</b><span>${alert.text}</span></div><button type="button" onclick="openDashboardAlert('${alert.type}')">${alert.action}</button></div>`).join("");

  const weekKeys = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];
  const currentDaily = dashboardDailyPoints(sales, 7, "sales");
  const previousDaily = dashboardDailyPoints(previousSales, 7, "sales");
  const maxBar = Math.max(1, ...currentDaily.map(p => p.value), ...previousDaily.map(p => p.value));
  if ($("comparisonBars")) $("comparisonBars").innerHTML = currentDaily.map((point, index) => {
    const prev = previousDaily[index]?.value || 0;
    const day = weekKeys[new Date(`${point.key}T00:00:00`).getDay()];
    return `<div><div class="bars"><span style="height:${(point.value / maxBar) * 100}%"></span><em style="height:${(prev / maxBar) * 100}%"></em></div><b>${day}</b></div>`;
  }).join("");

  if ($("recentActivity")) $("recentActivity").innerHTML = [
    ...sales.slice(0, 3).map(sale => ({ icon: "▱", title: `Nueva venta ${sale.ticket}`, detail: fmt(sale.total), time: localDateTime(sale.created_at), tone: "green" })),
    ...products.slice(0, 2).map(product => ({ icon: "□", title: "Producto actualizado", detail: product.name, time: localDateTime(product.updated_at || product.created_at || new Date()), tone: "purple" })),
  ].slice(0, 5).map(item => `<div><i class="${item.tone}">${item.icon}</i><span><b>${item.title}</b><em>${item.detail}</em></span><small>${item.time}</small></div>`).join("") || `<p class="empty-state">Sin actividad reciente.</p>`;
}

function filteredProductCatalog(products, mode) {
  const list = [...products];
  if (mode === "expiring") {
    return list
      .filter(product => {
        const days = daysUntilExpiration(product);
        return days !== null && days >= 0 && days <= 30;
      })
      .sort((a, b) => daysUntilExpiration(a) - daysUntilExpiration(b));
  }
  if (mode === "expired") return list.filter(product => daysUntilExpiration(product) !== null && daysUntilExpiration(product) < 0);
  if (mode === "low_stock") return list.filter(product => product.stock <= product.min_stock).sort((a, b) => a.stock - b.stock);
  if (mode === "less_stock") return list.sort((a, b) => a.stock - b.stock);
  if (mode === "more_stock") return list.sort((a, b) => b.stock - a.stock);
  if (mode === "best_sellers") return list.sort((a, b) => productSoldUnits(b.id) - productSoldUnits(a.id));
  if (mode === "slow_sellers") return list.sort((a, b) => productSoldUnits(a.id) - productSoldUnits(b.id));
  if (mode === "best_margin") return list.sort((a, b) => productMargin(b) - productMargin(a));
  if (mode === "no_image") return list.filter(product => !product.image_url);
  return list;
}

function productVisibility(product) {
  return product.active === false
    ? { label: "Oculto", cls: "hidden" }
    : { label: "Activo", cls: "active" };
}

function populateProductFilters(prefix, products) {
  const categorySelect = $(`${prefix}CategoryFilter`);
  const brandSelect = $(`${prefix}BrandFilter`);
  if (categorySelect) {
    const current = categorySelect.value || "all";
    const categories = [...new Set(products.map(product => categoryShort(product.category)).filter(Boolean))].sort();
    categorySelect.innerHTML = `<option value="all">Categorias</option>` + categories.map(category => `<option value="${category}">${category}</option>`).join("");
    categorySelect.value = categories.includes(current) ? current : "all";
  }
  if (brandSelect) {
    const current = brandSelect.value || "all";
    const brands = [...new Set(products.map(brandFromProduct).filter(Boolean))].sort();
    brandSelect.innerHTML = `<option value="all">Marcas</option>` + brands.map(brand => `<option value="${brand}">${brand}</option>`).join("");
    brandSelect.value = brands.includes(current) ? current : "all";
  }
}

function filterProductsByControls(products, prefix) {
  const category = $(`${prefix}CategoryFilter`)?.value || "all";
  const brand = $(`${prefix}BrandFilter`)?.value || "all";
  const status = $(`${prefix}StatusFilter`)?.value || "all";
  const stock = $(`${prefix}StockFilter`)?.value || "all";
  return products
    .filter(product => category === "all" || categoryShort(product.category) === category)
    .filter(product => brand === "all" || brandFromProduct(product) === brand)
    .filter(product => {
      if (status === "active") return product.active !== false;
      if (status === "inactive") return product.active === false;
      return true;
    })
    .filter(product => {
      const value = Number(product.stock || 0);
      const min = Number(product.min_stock || 0);
      if (stock === "high") return value > min;
      if (stock === "low") return value > 0 && value <= min;
      if (stock === "out") return value <= 0;
      return true;
    });
}

function renderProducts() {
  const catalogTerm = ($("catalogSearch")?.value || "").trim().toLowerCase();
  const productMode = $("productFilter")?.value || "all";
  const inventoryTerm = ($("inventorySearch")?.value || "").trim().toLowerCase();
  const saleTerm = ($("saleCatalogSearch")?.value || "").trim().toLowerCase();
  const saleCategory = $("saleCategoryFilter")?.value || "all";
  const saleStock = $("saleStockFilter")?.value || "all";
  const matches = (product, term) => !term || `${product.name} ${product.code} ${product.category} ${product.unit_name} ${product.pack_name}`.toLowerCase().includes(term);
  const visibleProducts = state.products || [];
  const activeSaleProducts = visibleProducts.filter(product => product.active !== false);
  populateProductFilters("catalog", visibleProducts);
  populateProductFilters("inventory", visibleProducts);
  const catalogProducts = filteredProductCatalog(filterProductsByControls(visibleProducts.filter(product => matches(product, catalogTerm)), "catalog"), productMode);
  let inventoryProducts = filterProductsByControls(visibleProducts.filter(product => matches(product, inventoryTerm)), "inventory");
  if (inventoryAlertFilter === "out") inventoryProducts = inventoryProducts.filter(product => Number(product.stock || 0) <= 0);
  if (inventoryAlertFilter === "low") inventoryProducts = inventoryProducts.filter(product => Number(product.stock || 0) > 0 && Number(product.stock || 0) <= Number(product.min_stock || 0));
  const saleCategories = [...new Set(activeSaleProducts.map(product => categoryShort(product.category)).filter(Boolean))].sort();
  const saleProducts = activeSaleProducts
    .filter(product => matches(product, saleTerm))
    .filter(product => saleCategory === "all" || categoryShort(product.category) === saleCategory)
    .filter(product => {
      const status = stockStatus(product).cls;
      if (saleStock === "available") return Number(product.stock || 0) > 0;
      if (saleStock === "low") return status === "low";
      if (saleStock === "out") return status === "out";
      return true;
    });
  const inventory = inventoryTotals();
  if (!state.selectedProductId || !visibleProducts.some(product => product.id === state.selectedProductId)) {
    state.selectedProductId = catalogProducts[0]?.id || visibleProducts[0]?.id || null;
  }

  if ($("saleCategoryFilter")) {
    const current = saleCategories.includes(saleCategory) ? saleCategory : "all";
    $("saleCategoryFilter").innerHTML = `<option value="all">Categorias</option>` + saleCategories.map(category => `<option value="${category}">${category}</option>`).join("");
    $("saleCategoryFilter").value = current;
  }
  if ($("saleCategoryTabs")) {
    const current = $("saleCategoryFilter")?.value || "all";
    const tabs = ["all", ...saleCategories.slice(0, 8)];
    $("saleCategoryTabs").innerHTML = tabs.map(category => `
      <button class="${current === category ? "active" : ""}" type="button" onclick="setSaleCategoryFilter('${category.replace(/'/g, "\\'")}')">${category === "all" ? "Todos" : category}</button>
    `).join("");
  }
  if ($("productGrid")) {
    $("productGrid").innerHTML = saleProducts.map(product => `
      <article class="sale-product ${Number(product.stock || 0) <= 0 ? "disabled" : ""}" onclick="addCart('${product.id}', 'unit')">
        <img src="${safeImageUrl(product.image_url)}" alt="${product.name}">
        <div>
          <b>${product.name}</b>
          <span>SKU: ${product.code}</span>
          <strong>${fmt(product.sale_price)}</strong>
        </div>
        ${stockBadge(product)}
      </article>`).join("") || `<p class="empty-state">No se encontraron productos.</p>`;
  }

  $("catalogTable").innerHTML = catalogProducts.map(product => {
    const status = stockStatus(product);
    const visibility = productVisibility(product);
    return `
    <tr class="${state.selectedProductId === product.id ? "selected" : ""}" onclick="selectCatalogProduct('${product.id}')">
      <td><div class="table-product"><img class="thumb" src="${safeImageUrl(product.image_url)}" alt="${product.name}"><div><b>${product.name}</b><br><span>SKU: ${product.code}</span></div></div></td>
      <td>${categoryShort(product.category)}</td>
      <td>${brandFromProduct(product)}</td>
      <td>${fmt(product.sale_price)}</td>
      <td><b class="stock-number ${status.cls}">${product.stock}</b></td>
      <td><span class="catalog-status ${visibility.cls === "hidden" ? "inactive" : "active"}">${visibility.label}</span></td>
      <td><button class="catalog-icon-btn" onclick="event.stopPropagation(); editProduct('${product.id}')" title="Editar">✎</button> <button class="catalog-icon-btn ${product.active === false ? "" : "danger"}" onclick="event.stopPropagation(); toggleProductSaleVisibility('${product.id}')" title="${product.active === false ? "Mostrar en venta" : "Ocultar de venta"}">${product.active === false ? "+" : "-"}</button></td>
    </tr>`;
  }).join("") || `<tr><td colspan="7">No se encontraron productos</td></tr>`;
  renderProductDetail();
  renderCatalogStats(catalogProducts, visibleProducts);

  $("productsTable").innerHTML = inventoryProducts.map(product => {
    const status = stockStatus(product);
    const inventoryState = product.active === false ? productVisibility(product) : status;
    return `
    <tr>
      <td><div class="table-product"><img class="thumb" src="${safeImageUrl(product.image_url)}" alt="${product.name}"><div><b>${product.name}</b><br><span>SKU: ${product.code}</span></div></div></td>
      <td>${categoryShort(product.category)}</td>
      <td>${fmt(product.sale_price)}</td>
      <td><b class="stock-number ${status.cls}">${product.stock}</b></td>
      <td><span class="stock-status ${inventoryState.cls}">${inventoryState.label}</span></td>
      <td><button class="icon-btn" onclick="editProduct('${product.id}')" title="Editar">✎</button> <button class="icon-btn danger" onclick="deleteProduct('${product.id}')" title="Eliminar">⌫</button></td>
    </tr>`;
  }).join("") || `<tr><td colspan="6">No se encontraron productos</td></tr>`;

  $("inventoryCost").textContent = fmt(inventory.cost);
  $("inventoryRevenue").textContent = fmt(inventory.revenue);
  $("inventoryProfit").textContent = fmt(inventory.profit);
  const totalProducts = state.products.length;
  const inStock = state.products.filter(product => Number(product.stock || 0) > Number(product.min_stock || 0)).length;
  const lowStock = state.products.filter(product => Number(product.stock || 0) > 0 && Number(product.stock || 0) <= Number(product.min_stock || 0)).length;
  const outStock = state.products.filter(product => Number(product.stock || 0) <= 0).length;
  if ($("inventoryTotalProducts")) $("inventoryTotalProducts").textContent = totalProducts;
  if ($("inventoryInStock")) $("inventoryInStock").textContent = inStock;
  if ($("inventoryLowCount")) $("inventoryLowCount").textContent = lowStock;
  if ($("inventoryOutCount")) $("inventoryOutCount").textContent = outStock;
  if ($("inventoryInStockHint")) $("inventoryInStockHint").textContent = totalProducts ? `${((inStock / totalProducts) * 100).toFixed(1)}% del total` : "0% del total";
  if ($("inventoryFootText")) $("inventoryFootText").textContent = `Mostrando ${inventoryProducts.length} de ${totalProducts} productos`;
  if ($("inventoryValueText")) $("inventoryValueText").textContent = `Valor del inventario ${fmt(inventory.cost)}`;

  const selected = $("stockProduct").value;
  $("stockProduct").innerHTML = inventoryProducts.map(product => `<option value="${product.id}">${product.name}</option>`).join("");
  if (selected && inventoryProducts.some(p => p.id === selected)) $("stockProduct").value = selected;
  else if (inventoryProducts[0]) $("stockProduct").value = inventoryProducts[0].id;
  renderSelectedStockProduct();
  renderRecentSalesMini();
}

function renderCatalogStats(catalogProducts, visibleProducts) {
  const total = visibleProducts.length;
  const active = visibleProducts.filter(product => product.active !== false).length;
  const inactive = Math.max(0, total - active);
  const categories = new Set(visibleProducts.map(product => categoryShort(product.category)).filter(Boolean));
  const brands = new Set(visibleProducts.map(brandFromProduct).filter(Boolean));
  if ($("catalogTotalProducts")) $("catalogTotalProducts").textContent = total;
  if ($("catalogActiveProducts")) $("catalogActiveProducts").textContent = active;
  if ($("catalogInactiveProducts")) $("catalogInactiveProducts").textContent = inactive;
  if ($("catalogCategoryCount")) $("catalogCategoryCount").textContent = categories.size;
  if ($("catalogBrandCount")) $("catalogBrandCount").textContent = brands.size;
  if ($("catalogActiveHint")) $("catalogActiveHint").textContent = total ? `${((active / total) * 100).toFixed(1)}% del total` : "0% del total";
  if ($("catalogInactiveHint")) $("catalogInactiveHint").textContent = total ? `${((inactive / total) * 100).toFixed(1)}% del total` : "0% del total";
  if ($("catalogFootText")) $("catalogFootText").textContent = `Mostrando 1 a ${catalogProducts.length} de ${total} productos`;
}

function renderProductDetail() {
  if (!$("productDetail")) return;
  const product = state.products.find(item => item.id === state.selectedProductId);
  if (!product) {
    $("productDetail").innerHTML = `<p class="muted-info">Selecciona un producto para ver el detalle.</p>`;
    return;
  }
  const status = stockStatus(product);
  const visibility = productVisibility(product);
  $("productDetail").innerHTML = `
    <div class="detail-product-head">
      <img src="${safeImageUrl(product.image_url)}" alt="${product.name}">
      <div>
        <b>${product.name}</b>
        <span class="catalog-status ${visibility.cls === "hidden" ? "inactive" : "active"}">${visibility.label}</span>
        <p>SKU: ${product.code}</p>
      </div>
    </div>
    <div class="detail-box">
      <h4>Informacion general</h4>
      <p><span>Categoria</span><b>${categoryShort(product.category)}</b></p>
      <p><span>Marca</span><b>${brandFromProduct(product)}</b></p>
      <p><span>Precio</span><b>${fmt(product.sale_price)}</b></p>
      <p><span>Costo</span><b>${fmt(product.purchase_price)}</b></p>
      <p><span>Stock actual</span><b class="stock-number ${status.cls}">${product.stock} unidades</b></p>
      <p><span>Estado</span><b>${visibility.label}</b></p>
    </div>
    <div class="detail-description">
      <h4>Descripcion</h4>
      <p>${product.description || "Sin descripcion registrada."}</p>
    </div>
    <div class="detail-actions">
      <button type="button" onclick="editProduct('${product.id}')">✎ Editar producto</button>
      <button type="button" class="${product.active === false ? "" : "danger"}" onclick="toggleProductSaleVisibility('${product.id}')">${product.active === false ? "+ Mostrar en venta" : "- Ocultar de venta"}</button>
    </div>`;
}

function renderServices() {
  if (!$("saleServicesGrid")) return;
  const companyFilter = $("serviceCompanyFilter").value || "all";
  const companies = ["all", ...SERVICE_COMPANIES];
  $("serviceCompanyFilter").innerHTML = companies.map(company =>
    `<option value="${company}">${company === "all" ? "Todas las companias" : company}</option>`
  ).join("");
  $("serviceCompanyFilter").value = companies.includes(companyFilter) ? companyFilter : "all";

  const visibleServices = state.services
    .filter(service => service.active !== false)
    .filter(service => companyFilter === "all" || service.company === companyFilter);

  $("saleServicesGrid").innerHTML = visibleServices.map(service => `
    <article class="service-card">
      <div>${companyBadge(service.company)}<h3>${service.name}</h3></div>
      <p>${service.type === "recarga" ? "Recarga" : "Paquete"} ${service.custom_amount ? "de monto variable" : fmt(service.sale_price)}</p>
      <button onclick="addService('${service.id}')">${service.custom_amount ? "Agregar recarga" : `Agregar ${fmt(service.sale_price)}`}</button>
    </article>`).join("") || "<p>No hay servicios configurados. Ejecuta el SQL de servicios o agrega uno desde Administrador.</p>";

  if ($("servicesTable")) {
    $("servicesTable").innerHTML = state.services.map(service => `
      <tr>
        <td>${companyBadge(service.company)}</td>
        <td>${service.type === "recarga" ? "Recarga" : "Paquete"}</td>
        <td><b>${service.name}</b></td>
        <td>${service.custom_amount ? "Variable" : fmt(service.sale_price)}</td>
        <td>${service.custom_amount ? "Por comision" : fmt(service.cost)}</td>
        <td>${service.yvr_enabled ? `Activo ${service.yvr_product_code || "sin codigo"}` : "Manual"}</td>
        <td><button class="muted-btn" onclick="editService('${service.id}')">Editar</button> <button class="danger-btn" onclick="deleteService('${service.id}')">Eliminar</button></td>
      </tr>`).join("") || `<tr><td colspan="7">Sin servicios configurados</td></tr>`;
  }
}

window.addCart = (productId, mode = "unit") => {
  const product = state.products.find(p => p.id === productId);
  if (!product) return toast("Producto no encontrado");
  const modeInfo = modeData(product, mode);
  if (cartUnits(productId) + modeInfo.units > product.stock) return toast("Stock insuficiente");
  const id = `${productId}:${mode}`;
  const existing = state.cart.find(item => item.id === id);
  if (existing) existing.qty += 1;
  else {
    state.cart.push({
      id,
      product_id: product.id,
      product_name: product.name,
      mode,
      label: modeInfo.label,
      qty: 1,
      units_per_sale: modeInfo.units,
      unit_price: modeInfo.price,
      unit_cost: modeInfo.cost,
    });
  }
  renderCart();
};

window.setSaleCategoryFilter = (category) => {
  if ($("saleCategoryFilter")) $("saleCategoryFilter").value = category;
  renderProducts();
};

window.openDashboardAlert = (type) => {
  if (type === "sync") {
    setReportTab("summary");
    showView("reports");
    toast(offlineQueue().length ? `${offlineQueue().length} cambio(s) pendientes por sincronizar` : "Todo sincronizado");
    return;
  }
  inventoryAlertFilter = type === "out" ? "out" : type === "low" ? "low" : "all";
  if ($("inventorySearch")) $("inventorySearch").value = "";
  showView("stock");
  renderProducts();
  document.querySelector(".products-list-panel")?.scrollIntoView({ behavior: "smooth", block: "start" });
};

window.removeCartItem = (id) => {
  state.cart = state.cart.filter(entry => entry.id !== id);
  renderCart();
};

window.addService = (serviceId) => {
  const service = state.services.find(item => item.id === serviceId);
  if (!service) return toast("Servicio no configurado");
  const phone = $("servicePhone").value.trim();
  if (!phone) return toast("Ingresa el numero de telefono");
  const amount = service.custom_amount ? Number($("serviceAmount").value || 0) : Number(service.sale_price || 0);
  if (amount <= 0) return toast("Ingresa un monto valido");
  const cost = service.custom_amount
    ? Math.max(0, amount - (amount * Number(service.commission_pct || 0) / 100))
    : Number(service.cost || 0);
  const id = `service:${service.id}:${phone}:${amount}:${Date.now()}`;
  state.cart.push({
    id,
    item_type: "service",
    service_id: service.id,
    product_id: null,
    product_name: `${service.company} - ${service.name}`,
    company: service.company,
    phone,
    mode: "service",
    label: service.type === "recarga" ? `Recarga ${phone}` : `Paquete ${phone}`,
    qty: 1,
    units_per_sale: 1,
    unit_price: amount,
    unit_cost: cost,
  });
  $("serviceAmount").value = "";
  renderCart();
};

window.qty = (id, delta) => {
  const item = state.cart.find(entry => entry.id === id);
  if (!item) return;
  if (item.item_type === "service" && delta > 0) return toast("Agrega otra recarga como linea separada");
  if (item.item_type === "service") {
    item.qty += delta;
    if (item.qty <= 0) state.cart = state.cart.filter(entry => entry.id !== id);
    return renderCart();
  }
  const product = state.products.find(entry => entry.id === item.product_id);
  if (delta > 0 && cartUnits(product.id) + item.units_per_sale > product.stock) return toast("Stock insuficiente");
  item.qty += delta;
  if (item.qty <= 0) state.cart = state.cart.filter(entry => entry.id !== id);
  renderCart();
};

async function sendYvrTopups(cartSnapshot) {
  const topups = cartSnapshot.filter(item => {
    const service = state.services.find(entry => entry.id === item.service_id);
    return item.item_type === "service" && service?.yvr_enabled;
  });
  for (const item of topups) {
    const { data, error } = await supabase.functions.invoke("yvr-topup", {
      body: {
        service_id: item.service_id,
        phone: item.phone,
        amount: item.unit_price,
      },
    });
    if (error) throw new Error(error.message || "No se pudo enviar la recarga a YoVendoRecarga");
    if (data?.error) throw new Error(data.error);
    item.provider_ref = data?.provider_ref || data?.reference || data?.transactionId || "";
  }
}

async function uploadImageToBucket(bucket, file, fallbackElementId) {
  if (!file) return fallbackElementId ? ($(fallbackElementId).src || null) : null;
  const ext = file.name.split(".").pop();
  const path = `${state.user.id}/${crypto.randomUUID()}.${ext}`;
  await requireOk(await supabase.storage.from(bucket).upload(path, file, { upsert: true }));
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

async function saleProofImage(forceLocalImage = false) {
  const file = $("saleImageFile")?.files[0];
  if (!file) return $("salePreview")?.src || null;
  return forceLocalImage ? await readFileAsDataUrl(file, "salePreview") : await uploadImageToBucket("sale-images", file, "salePreview");
}

function resetSaleProof() {
  if (!$("saleImageFile")) return;
  $("saleImageFile").value = "";
  $("salePreview").removeAttribute("src");
  $("salePreview").classList.remove("show");
}

function salePayloadFromCart(cartSnapshot, paymentAmount, proofImageUrl = null) {
  const notes = $("saleNotes")?.value?.trim() || "";
  const customer = $("saleCustomer")?.value?.trim() || "";
  const fulfillment = $("saleFulfillment")?.value || "Contraentrega";
  return {
    p_items: cartSnapshot.map(item => item.item_type === "service"
      ? { item_type: "service", service_id: item.service_id, amount: item.unit_price, phone: item.phone, qty: item.qty }
      : { item_type: "product", product_id: item.product_id, mode: item.mode, qty: item.qty }),
    p_payment: paymentAmount,
    p_payment_method: $("paymentMethod").value,
    p_proof_image_url: proofImageUrl,
    p_discount: Number(state.saleDiscount || 0),
    p_customer_name: customer || null,
    p_fulfillment_type: fulfillment,
    p_notes: notes || null,
  };
}

function hasOnlineOnlyService(cartSnapshot) {
  return false;
}

function applyLocalStock(cartSnapshot) {
  cartSnapshot.forEach(item => {
    if (item.item_type === "service") return;
    const product = state.products.find(entry => entry.id === item.product_id);
    if (product) product.stock = Math.max(0, Number(product.stock || 0) - item.units_per_sale * item.qty);
  });
}

function queueOfflineSale(cartSnapshot, paymentAmount, totalSnapshot, proofImageUrl = null) {
  if (hasOnlineOnlyService(cartSnapshot)) {
    throw new Error("Las recargas por YoVendoRecarga necesitan internet");
  }
  const localTicket = `LOCAL-${Date.now()}`;
  const queue = offlineQueue();
  queue.push({
    id: crypto.randomUUID(),
    ticket: localTicket,
    created_at: new Date().toISOString(),
    payload: salePayloadFromCart(cartSnapshot, paymentAmount, proofImageUrl),
    cart: cartSnapshot,
    payment: paymentAmount,
    totals: totalSnapshot,
  });
  setOfflineQueue(queue);
  applyLocalStock(cartSnapshot);
  saveCache();
  return { ticket: localTicket, total: totalSnapshot.total, change: paymentAmount - totalSnapshot.total, offline: true };
}

let syncingOfflineSales = false;
async function syncOfflineSales() {
  if (syncingOfflineSales || !isOnline() || !state.session) return;
  let queue = offlineQueue();
  if (!queue.length) return renderSyncStatus();
  syncingOfflineSales = true;
  try {
    const remaining = [];
    const cashIdMap = {};
    for (const sale of queue) {
      try {
        if (sale.type === "cash_open") {
          const opened = await requireOk(await supabase.rpc("open_cash", { p_opening_cash: sale.opening_cash }));
          if (sale.local_cash_id && opened?.id) cashIdMap[sale.local_cash_id] = opened.id;
        } else if (sale.type === "cash_move") {
          const sessionId = cashIdMap[sale.cash_session_id] || (sale.cash_session_id?.startsWith("LOCAL-")
            ? (await requireOk(await supabase.from("cash_sessions").select("id").eq("status", "open").order("opened_at", { ascending: false }).limit(1)))[0]?.id
            : sale.cash_session_id)
            || (await requireOk(await supabase.from("cash_sessions").select("id").eq("status", "open").order("opened_at", { ascending: false }).limit(1)))[0]?.id;
          if (!sessionId) throw new Error("No hay caja remota abierta");
          await requireOk(await supabase.from("cash_movements").insert({
            cash_session_id: sessionId,
            user_id: sale.user_id,
            type: sale.move_type,
            amount: sale.amount,
            reason: sale.reason,
          }));
        } else if (sale.type === "cash_close") {
          const sessionId = cashIdMap[sale.cash_session_id] || (sale.cash_session_id?.startsWith("LOCAL-")
            ? (await requireOk(await supabase.from("cash_sessions").select("id").eq("status", "open").order("opened_at", { ascending: false }).limit(1)))[0]?.id
            : sale.cash_session_id)
            || (await requireOk(await supabase.from("cash_sessions").select("id").eq("status", "open").order("opened_at", { ascending: false }).limit(1)))[0]?.id;
          if (!sessionId) throw new Error("No hay caja remota abierta");
          await requireOk(await supabase.rpc("close_cash_session", { p_cash_session_id: sessionId, p_counted_cash: sale.counted_cash, p_notes: sale.notes }));
        } else if (sale.type === "product_upsert") {
          await requireOk(await supabase.from("products").upsert(sale.product));
        } else if (sale.type === "product_deactivate") {
          await requireOk(await supabase.from("products").update({ active: sale.active }).eq("id", sale.product_id));
        } else if (sale.type === "product_delete") {
          await requireOk(await supabase.from("products").delete().eq("id", sale.product_id));
        } else if (sale.type === "stock_movement") {
          await requireOk(await supabase.from("products").update({ stock: sale.stock_after }).eq("id", sale.product_id));
          await requireOk(await supabase.from("stock_movements").insert({
            product_id: sale.product_id,
            user_id: sale.user_id,
            type: sale.move_type,
            qty: sale.qty,
            stock_after: sale.stock_after,
            reason: sale.reason,
          }));
        } else if (sale.type === "service_upsert") {
          await requireOk(await supabase.from("service_catalog").upsert(sale.service));
        } else if (sale.type === "service_delete") {
          await requireOk(await supabase.from("service_catalog").update({ active: false }).eq("id", sale.service_id));
        } else {
          await requireOk(await supabase.rpc("create_sale", sale.payload));
        }
      } catch (err) {
        remaining.push(sale);
      }
    }
    setOfflineQueue(remaining);
    if (queue.length !== remaining.length) {
      toast(`Sincronizados ${queue.length - remaining.length} cambio(s) offline`);
      await refresh();
    }
  } finally {
    syncingOfflineSales = false;
    renderSyncStatus();
  }
}

function renderCart() {
  $("cartList").innerHTML = state.cart.map(item => {
    const product = state.products.find(entry => entry.id === item.product_id);
    const lineTotal = Number(item.unit_price || 0) * Number(item.qty || 0);
    return `
    <tr>
      <td>
        <div class="cart-product">
          <img src="${safeImageUrl(product?.image_url)}" alt="${item.product_name}">
          <div><b>${item.product_name}</b><span>SKU: ${product?.code || item.label}</span></div>
        </div>
      </td>
      <td>${fmt(item.unit_price)}</td>
      <td>
        <div class="qty"><button onclick="qty('${item.id}',-1)">-</button><b>${item.qty}</b><button onclick="qty('${item.id}',1)">+</button></div>
      </td>
      <td>$0.00</td>
      <td><b>${fmt(lineTotal)}</b></td>
      <td><button class="table-delete" onclick="removeCartItem('${item.id}')" title="Eliminar">x</button></td>
    </tr>`;
  }).join("") || `<tr><td colspan="6" class="empty-state">Carrito vacio.</td></tr>`;
  if ($("cartCount")) $("cartCount").textContent = state.cart.reduce((sum, item) => sum + Number(item.qty || 0), 0);
  const data = totals();
  $("subtotal").textContent = fmt(data.subtotal);
  if ($("discountTotal")) $("discountTotal").textContent = `-${fmt(data.discount)}`;
  $("tax").textContent = fmt(data.tax);
  $("cost").textContent = fmt(data.cost);
  $("total").textContent = fmt(data.total);
  $("change").textContent = fmt(Math.max(0, Number($("payment").value || 0) - data.total));
}

function clearSaleMeta() {
  state.saleDiscount = 0;
  if ($("saleCustomer")) $("saleCustomer").value = "";
  if ($("saleNotes")) $("saleNotes").value = "";
  if ($("saleFulfillment")) $("saleFulfillment").value = "Contraentrega";
}

function renderRecentSalesMini() {
  if (!$("recentSalesMini")) return;
  $("recentSalesMini").innerHTML = state.reports.sales.slice(0, 3).map(sale => `
    <div class="recent-sale-row">
      <b>${sale.ticket}</b>
      <span>${profileName(sale.user_id)}</span>
      <strong>${fmt(sale.total)}</strong>
      <em>${localDateTime(sale.created_at)}</em>
      <button type="button" title="Mas">...</button>
    </div>`).join("") || `<p class="empty-state">Sin ventas recientes.</p>`;
}

function renderCash() {
  if (!$("cashStatus")) return;
  const pendingCash = pendingOfflineCash();
  $("cashStatus").textContent = state.cash ? "Abierta" : "Cerrada";
  $("openingCash").textContent = fmt(state.cash?.opening_cash);
  $("expectedCash").textContent = fmt(Number(state.cash?.expected_cash || 0) + pendingCash);
  $("checkoutBtn").disabled = false;
  const lastClose = lastClosure();
  const suggestedOpening = Number(lastClose?.counted_cash ?? lastClose?.expected_cash ?? 0);
  $("lastCloseInfo").textContent = lastClose
    ? `Ultimo cierre: ${fmt(suggestedOpening)} (${localDateTime(lastClose.closed_at || lastClose.opened_at)})`
    : "Ultimo cierre: sin cierres registrados";
  if (!state.cash && !$("openAmount").value) $("openAmount").value = suggestedOpening ? suggestedOpening.toFixed(2) : "";

  const expected = Number(state.cash?.expected_cash || 0) + pendingCash;
  $("closeExpectedInfo").textContent = `Efectivo esperado: ${fmt(expected)}`;
  $("countedCash").placeholder = expected.toFixed(2);
  if (state.cash && !$("countedCash").value) $("countedCash").value = expected.toFixed(2);
}

function lastClosure() {
  return state.closures[0] || null;
}

function renderReportControls() {
  if (!$("reportCashier")) return;
  const current = $("reportCashier").value || "all";
  $("reportCashier").innerHTML = `<option value="all">Todos</option>` + state.profiles.map(profile => `<option value="${profile.id}">${profile.name} (${profile.role})</option>`).join("");
  $("reportCashier").value = state.profiles.some(profile => profile.id === current) ? current : "all";
}

function saleItemsFor(saleId) {
  return (state.reports.sale_items || [])
    .filter(item => item.sale_id === saleId)
    .map(item => ({
      ...item,
      product: state.products.find(product => product.id === item.product_id),
    }));
}

function saleCardHtml(sale) {
  const items = saleItemsFor(sale.id);
  return `
    <article class="ticket-card">
      <div class="ticket-head">
        <div><b>${sale.ticket}</b><span>${localDateTime(sale.created_at)} - ${profileName(sale.user_id)}</span></div>
        <strong>${fmt(sale.total)}</strong>
      </div>
      ${sale.proof_image_url ? `<img class="sale-proof-img" src="${safeImageUrl(sale.proof_image_url)}" alt="Foto de venta ${sale.ticket}">` : ""}
      <div class="ticket-items">
        ${items.map(item => `
          <div class="ticket-item">
            ${saleItemVisual(item)}
            <div>
              <b>${item.product_name}</b>
              <span>${item.qty} x ${item.label} - ${item.qty * item.units_per_sale} unidades</span>
            </div>
            <strong>${fmt(item.line_total)}</strong>
          </div>`).join("") || "<p>Sin detalle de productos.</p>"}
      </div>
      <div class="ticket-foot"><span>Ganancia ${fmt(sale.profit)}</span><span>Pago ${sale.payment_method}</span></div>
    </article>`;
}

function renderReports() {
  $("salesList").innerHTML = state.reports.sales.slice(0, 50).map(saleCardHtml).join("") || "<p>Sin ventas recientes.</p>";
  if (!$("reportOutput").innerHTML.trim()) generateReport();
}

function showView(name, options = {}) {
  if (!name) return;
  if (!canUseView(name)) {
    if (!options.silent) toast("No tienes permiso para esta seccion");
    name = defaultView();
  }
  closeProductForm();
  closeProductDetailPanel();
  document.querySelectorAll("aside button[data-view]").forEach(button => button.classList.toggle("active", button.dataset.view === name));
  document.querySelectorAll(".view").forEach(view => view.classList.toggle("active", view.id === `${name}View`));
  $("title").textContent = { dashboard: "Dashboard", sale: "Venta", products: "Productos", stock: "Inventario", ahorrosv: "Zona Digital", users: "Usuarios", reports: "Reportes" }[name];
}

async function uploadImage(file) {
  return uploadImageToBucket("product-images", file, "preview");
}

function readFileAsDataUrl(file, fallbackElementId = "preview") {
  return new Promise((resolve, reject) => {
    if (!file) return resolve($(fallbackElementId)?.src || null);
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error || new Error("No se pudo leer la imagen"));
    reader.readAsDataURL(file);
  });
}

async function productPayloadFromForm(forceLocalImage = false) {
  calculatePurchaseUnitPrice();
  if (!$("category").value) throw new Error("Selecciona una categoria del inventario");
  const existingProduct = state.products.find(product => product.id === $("productId").value);
  const file = $("imageFile").files[0];
  let image_url = safeImageUrl($("preview").src, "") || null;
  if (file) {
    image_url = forceLocalImage ? await readFileAsDataUrl(file) : await uploadImage(file);
  }
  return {
    id: $("productId").value || crypto.randomUUID(),
    code: $("code").value,
    name: $("name").value,
    category: $("category").value,
    unit_name: $("unitName").value,
    pack_name: $("packName").value,
    pack_size: Number($("packSize").value),
    purchase_price: Number($("purchasePrice").value),
    sale_price: Number($("salePrice").value),
    pack_price: Number($("packPrice").value),
    stock: Number($("stock").value),
    min_stock: Number($("minStock").value),
    expiration_date: $("expirationDate").value || null,
    description: $("description")?.value || "",
    image_url,
    active: existingProduct?.active ?? true,
  };
}

function applyLocalProduct(product) {
  const existingIndex = state.products.findIndex(item => item.id === product.id);
  if (existingIndex >= 0) state.products[existingIndex] = { ...state.products[existingIndex], ...product };
  else state.products.push(product);
  state.products.sort((a, b) => a.name.localeCompare(b.name));
  saveCache();
  renderAll();
}

function servicePayloadFromForm() {
  const custom = $("serviceCustomAmount").checked;
  const salePrice = Number($("serviceSalePrice").value || 0);
  const cost = Number($("serviceCost").value || 0);
  return {
    id: $("serviceId").value || crypto.randomUUID(),
    company: $("serviceCompany").value,
    type: $("serviceType").value,
    name: $("serviceName").value,
    sale_price: custom ? 0 : salePrice,
    cost: custom ? 0 : cost,
    commission_pct: custom && salePrice > 0 ? salePrice : 0,
    custom_amount: custom,
    yvr_product_code: $("serviceYvrCode").value.trim() || null,
    yvr_enabled: $("serviceYvrEnabled").checked,
    active: true,
  };
}

function applyLocalService(service) {
  const existingIndex = state.services.findIndex(item => item.id === service.id);
  if (existingIndex >= 0) state.services[existingIndex] = { ...state.services[existingIndex], ...service };
  else state.services.push(service);
  state.services.sort((a, b) => `${a.company} ${a.name}`.localeCompare(`${b.company} ${b.name}`));
  saveCache();
  renderAll();
}

function renderSelectedStockProduct() {
  const product = state.products.find(entry => entry.id === $("stockProduct")?.value) || state.products[0];
  if (!$("stockProductImage")) return;
  if (!product) {
    $("stockProductImage").removeAttribute("src");
    $("stockProductInfo").innerHTML = "<p>Sin producto seleccionado.</p>";
    return;
  }
  $("stockProduct").value = product.id;
  $("stockProductImage").src = safeImageUrl(product.image_url);
  $("stockProductInfo").innerHTML = `
    <p><b>${product.name}</b></p>
    <p>Codigo: ${product.code}</p>
    <p>Stock: ${unitsText(product)}</p>
    <p>Vencimiento: ${expirationText(product)}</p>
    <p>Compra: ${fmt(product.purchase_price)} / Venta: ${fmt(product.sale_price)} / ${fmt(product.pack_price)}</p>`;
}

function setSelectValue(id, value) {
  const select = $(id);
  if (!select || value === undefined || value === null) return;
  const normalized = String(value).trim();
  if (!normalized) return;
  if (!select.options) {
    select.value = normalized;
    return;
  }
  const exists = [...select.options].some(option => option.value === normalized || option.textContent === normalized);
  if (!exists) select.add(new Option(normalized, normalized));
  select.value = normalized;
}

function calculatePurchaseUnitPrice() {
  if (!$("purchasePackPrice") || !$("purchasePrice") || !$("packSize")) return;
  if ($("purchasePackPrice").type === "hidden") {
    $("purchasePackPrice").value = $("purchasePrice").value || 0;
    if ($("packPrice")) $("packPrice").value = $("salePrice")?.value || 0;
    return;
  }
  const packCost = Number($("purchasePackPrice").value || 0);
  const packSize = Number($("packSize").value || 0);
  const unitCost = packSize > 0 ? packCost / packSize : 0;
  $("purchasePrice").value = unitCost ? unitCost.toFixed(4) : "";
}

function fillProductForm(product) {
  $("productId").value = product.id;
  $("code").value = product.code;
  $("name").value = product.name;
  setCategoryValue(product.category, false);
  setSelectValue("unitName", product.unit_name);
  setSelectValue("packName", product.pack_name);
  $("packSize").value = product.pack_size;
  $("purchasePackPrice").value = (Number(product.purchase_price || 0) * Number(product.pack_size || 1)).toFixed(2);
  $("purchasePrice").value = product.purchase_price;
  $("salePrice").value = product.sale_price;
  $("packPrice").value = product.pack_price;
  $("stock").value = product.stock;
  $("minStock").value = product.min_stock;
  $("expirationDate").value = product.expiration_date || "";
  if ($("description")) $("description").value = product.description || "";
  const previewUrl = safeImageUrl(product.image_url, "");
  if (previewUrl) $("preview").src = previewUrl;
  else $("preview").removeAttribute("src");
  $("preview").classList.toggle("show", !!previewUrl);
}

function resetProductForm() {
  $("productForm").reset();
  $("productId").value = "";
  setProductFormMode("new");
  setCategoryValue("", false);
  if ($("minStock")) $("minStock").value = "0";
  if ($("unitName")) $("unitName").value = "unidad";
  if ($("packName")) $("packName").value = "unidad";
  if ($("packSize")) $("packSize").value = "1";
  if ($("packPrice")) $("packPrice").value = "";
  if ($("purchasePackPrice")) $("purchasePackPrice").value = "";
  $("preview").removeAttribute("src");
  $("preview").classList.remove("show");
}

function setProductFormMode(mode = "new") {
  const title = document.querySelector(".inventory-form-panel h3");
  if (title) title.textContent = mode === "edit" ? "Editar producto" : "Agregar nuevo producto";
}

function isMobileLayout() {
  return window.matchMedia("(max-width: 760px)").matches;
}

function openProductForm(focusId = "name") {
  if (isMobileLayout()) {
    document.body.classList.add("mobile-product-form-open");
    document.documentElement.classList.add("mobile-product-form-open");
    setTimeout(() => $(focusId)?.focus({ preventScroll: true }), 180);
    return;
  }
  scrollProductFormIntoView(focusId);
}

function closeProductForm() {
  document.body.classList.remove("mobile-product-form-open");
  document.documentElement.classList.remove("mobile-product-form-open");
}

function openProductDetailPanel() {
  if (!isMobileLayout()) return;
  document.body.classList.add("mobile-product-detail-open");
  document.documentElement.classList.add("mobile-product-detail-open");
}

function closeProductDetailPanel() {
  document.body.classList.remove("mobile-product-detail-open");
  document.documentElement.classList.remove("mobile-product-detail-open");
}

function scrollProductFormIntoView(focusId = "name") {
  setTimeout(() => {
    const panel = document.querySelector(".inventory-form-panel");
    panel?.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => $(focusId)?.focus({ preventScroll: true }), 350);
  }, 80);
}

function selectInventoryProduct() {
  const product = state.products.find(entry => entry.id === $("stockProduct").value);
  if (!product) return;
  renderSelectedStockProduct();
  fillProductForm(product);
}

listen("loginForm", "submit", async (e) => {
  e.preventDefault();
  const email = emailForUsername($("loginUser").value.trim());
  const password = $("loginPass").value;
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return toast(error.message);
  await bootstrap();
});

listen("logoutBtn", "click", async () => { await teardownRealtime(); await supabase.auth.signOut(); location.reload(); });
document.querySelectorAll("aside button[data-view]").forEach(button => button.addEventListener("click", () => showView(button.dataset.view)));

listen("payment", "input", renderCart);
listen("dashboardStartDate", "change", renderDashboard);
listen("dashboardEndDate", "change", renderDashboard);
listen("dashboardMetric", "change", renderDashboard);
listen("dashboardFilterBtn", "click", renderDashboard);
listen("dashProductsLink", "click", () => showView("products"));
listen("dashReportsLink", "click", () => showView("reports"));
listen("dashInventoryLink", "click", () => showView("stock"));
listen("reportMetric", "change", generateReport);
listen("reportStartDate", "change", generateReport);
listen("reportEndDate", "change", generateReport);
listen("reportCompare", "change", generateReport);
listen("reportCategoryFilter", "change", generateReport);
listen("reportPaymentFilter", "change", generateReport);
listen("clearReportFiltersBtn", "click", () => {
  if ($("reportCashier")) $("reportCashier").value = "all";
  if ($("reportCategoryFilter")) $("reportCategoryFilter").value = "all";
  if ($("reportPaymentFilter")) $("reportPaymentFilter").value = "all";
  generateReport();
});
listen("reportProductsLink", "click", () => showView("products"));
listen("reportInventoryLink", "click", () => showView("stock"));
document.querySelectorAll("[data-report-tab]").forEach(button => button.addEventListener("click", () => {
  setReportTab(button.dataset.reportTab);
}));
listen("saleCatalogSearch", "input", renderProducts);
listen("saleCatalogSearch", "keydown", (event) => {
  if (event.key !== "Enter") return;
  event.preventDefault();
  const term = $("saleCatalogSearch").value.trim().toLowerCase();
  const exact = state.products.find(product =>
    product.code?.toLowerCase() === term || product.name?.toLowerCase() === term
  );
  if (!exact) return toast("Producto no encontrado");
  window.addCart(exact.id, "unit");
  $("saleCatalogSearch").value = "";
  renderProducts();
});
listen("saleCategoryFilter", "change", renderProducts);
listen("saleStockFilter", "change", renderProducts);
listen("clearCartBtn", "click", () => {
  state.cart = [];
  state.saleDiscount = 0;
  renderCart();
});
listen("applyDiscountBtn", "click", () => {
  const subtotal = totals().subtotal;
  if (!subtotal) return toast("Agrega productos antes de descontar");
  const value = prompt("Monto de descuento", Number(state.saleDiscount || 0).toFixed(2));
  if (value === null) return;
  const discount = Number(String(value).replace(",", "."));
  if (Number.isNaN(discount) || discount < 0) return toast("Descuento invalido");
  state.saleDiscount = Math.min(discount, subtotal);
  renderCart();
});
listen("addClientBtn", "click", () => {
  const current = $("saleCustomer")?.value || "";
  const value = prompt("Nombre o telefono del cliente", current);
  if (value === null) return;
  $("saleCustomer").value = value.trim();
  $("saleCustomer").focus();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "F2") {
    event.preventDefault();
    $("applyDiscountBtn")?.click();
  }
  if (event.key === "F3") {
    event.preventDefault();
    $("addClientBtn")?.click();
  }
});
listen("catalogSearch", "input", renderProducts);
listen("productFilter", "change", renderProducts);
listen("catalogCategoryFilter", "change", renderProducts);
listen("catalogBrandFilter", "change", renderProducts);
listen("catalogStatusFilter", "change", renderProducts);
listen("catalogStockFilter", "change", renderProducts);
listen("inventorySearch", "input", () => {
  inventoryAlertFilter = "all";
  renderProducts();
});
listen("inventoryCategoryFilter", "change", renderProducts);
listen("inventoryBrandFilter", "change", renderProducts);
listen("inventoryStatusFilter", "change", renderProducts);
listen("inventoryStockFilter", "change", renderProducts);
listen("usersSearch", "input", () => renderUsers());
listen("usersRoleFilter", "change", () => renderUsers());
listen("serviceCompanyFilter", "change", renderServices);
listen("stockProduct", "change", selectInventoryProduct);
listen("purchasePackPrice", "input", calculatePurchaseUnitPrice);
listen("packSize", "input", calculatePurchaseUnitPrice);
listen("compareProductBtn", "click", () => {
  const product = state.products.find(entry => entry.id === $("stockProduct").value);
  if (!product) return toast("Selecciona un producto");
  searchAhorro(product.name);
});
listen("newProductBtn", "click", () => {
  inventoryAlertFilter = "all";
  resetProductForm();
  setProductFormMode("new");
  openProductForm("name");
});
listen("closeProductFormBtn", "click", closeProductForm);
listen("closeProductDetailBtn", "click", closeProductDetailPanel);
listen("useExpectedBtn", "click", () => {
  const expected = Number(state.cash?.expected_cash || 0) + pendingOfflineCash();
  $("countedCash").value = expected.toFixed(2);
});

listen("scanBtn", "click", () => {
  const code = $("scanInput").value.trim().toLowerCase();
  const product = state.products.find(entry => entry.code.toLowerCase() === code);
  if (!product) return toast("Producto no encontrado");
  window.addCart(product.id, "unit");
  $("scanInput").value = "";
});

listen("checkoutBtn", "click", async () => {
  try {
    if (!state.cart.length) return toast("El carrito esta vacio");
    const cartSnapshot = [...state.cart];
    const totalSnapshot = totals();
    const paymentAmount = Number($("payment").value || 0);
    if (paymentAmount < totalSnapshot.total) return toast("Pago insuficiente");
    let result;
    if (!isOnline()) {
      result = queueOfflineSale(cartSnapshot, paymentAmount, totalSnapshot, await saleProofImage(true));
      toast(`Venta guardada offline ${result.ticket}`);
    } else {
      const proofImageUrl = await saleProofImage(false);
      result = await requireOk(await supabase.rpc("create_sale", salePayloadFromCart(cartSnapshot, paymentAmount, proofImageUrl)));
      toast(`Venta ${result.ticket}, cambio ${fmt(result.change)}`);
    }
    printTicket(result, cartSnapshot, paymentAmount, totalSnapshot);
    state.cart = [];
    $("payment").value = "";
    clearSaleMeta();
    resetSaleProof();
    if (result.offline) renderAll();
    else await refresh();
  } catch (err) {
    try {
      const cartSnapshot = [...state.cart];
      const totalSnapshot = totals();
      const paymentAmount = Number($("payment").value || 0);
      const result = queueOfflineSale(cartSnapshot, paymentAmount, totalSnapshot, await saleProofImage(true));
      printTicket(result, cartSnapshot, paymentAmount, totalSnapshot);
      state.cart = [];
      $("payment").value = "";
      clearSaleMeta();
      resetSaleProof();
      renderAll();
      toast(`Venta guardada offline ${result.ticket}`);
    } catch (offlineErr) {
      toast(offlineErr.message || err.message);
    }
  }
});

listen("openCashForm", "submit", async e => {
  e.preventDefault();
  const openingCash = Number($("openAmount").value || 0);
  try {
    if (!isOnline()) throw new Error("offline");
    await requireOk(await supabase.rpc("open_cash", { p_opening_cash: openingCash }));
    await refresh();
  } catch (err) {
    const localCashId = `LOCAL-CASH-${Date.now()}`;
    state.cash = {
      id: localCashId,
      user_id: state.user.id,
      opening_cash: openingCash,
      expected_cash: openingCash,
      status: "open",
      opened_at: new Date().toISOString(),
    };
    queueOfflineChange({ type: "cash_open", local_cash_id: localCashId, opening_cash: openingCash });
    renderAll();
    toast("Caja abierta offline. Se sincronizara al volver internet.");
  }
});

listen("cashMoveForm", "submit", async e => {
  e.preventDefault();
  if (!state.cash) return toast("No hay caja abierta");
  const moveType = $("moveType").value;
  const amount = Number($("moveAmount").value);
  const reason = $("moveReason").value;
  try {
    if (!isOnline()) throw new Error("offline");
    await requireOk(await supabase.from("cash_movements").insert({
      cash_session_id: state.cash.id,
      user_id: state.user.id,
      type: moveType,
      amount,
      reason,
    }));
    e.target.reset();
    await refresh();
  } catch (err) {
    const sign = moveType === "Ingreso" ? 1 : -1;
    state.cash.expected_cash = Number(state.cash.expected_cash || state.cash.opening_cash || 0) + sign * amount;
    queueOfflineChange({
      type: "cash_move",
      cash_session_id: state.cash.id,
      user_id: state.user.id,
      move_type: moveType,
      amount,
      reason,
    });
    e.target.reset();
    renderAll();
    toast("Movimiento guardado offline.");
  }
});

listen("closeCashForm", "submit", async e => {
  e.preventDefault();
  const expected = Number(state.cash?.expected_cash || 0) + pendingOfflineCash();
  const counted = Number($("countedCash").value);
  const notes = $("cashNotes").value;
  try {
    if (!state.cash) return toast("No hay caja abierta");
    if (!isOnline()) throw new Error("offline");
    if (state.cash) {
      state.cash.expected_cash = await requireOk(await supabase.rpc("expected_cash", { p_cash_session_id: state.cash.id }));
      if (!$("countedCash").value) $("countedCash").value = Number(state.cash.expected_cash || 0).toFixed(2);
    }
    await requireOk(await supabase.rpc("close_cash", { p_counted_cash: counted, p_notes: notes }));
    e.target.reset();
    await refresh();
  } catch (err) {
    if (!state.cash) return toast("No hay caja abierta");
    state.closures = [{
      ...state.cash,
      status: "closed",
      expected_cash: expected,
      counted_cash: counted,
      difference: counted - expected,
      notes,
      closed_at: new Date().toISOString(),
    }, ...state.closures];
    const closedCashId = state.cash.id;
    state.cash = null;
    queueOfflineChange({ type: "cash_close", cash_session_id: closedCashId, counted_cash: counted, notes });
    e.target.reset();
    renderAll();
    toast("Cierre guardado offline.");
  }
});

listen("imageFile", "change", () => {
  const file = $("imageFile").files[0];
  if (!file) return;
  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) return toast("Solo JPG, PNG o WEBP");
  const reader = new FileReader();
  reader.onload = () => { $("preview").src = reader.result; $("preview").classList.add("show"); };
  reader.readAsDataURL(file);
});

listen("saleImageFile", "change", () => {
  const file = $("saleImageFile").files[0];
  if (!file) return;
  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) return toast("Solo JPG, PNG o WEBP");
  const reader = new FileReader();
  reader.onload = () => { $("salePreview").src = reader.result; $("salePreview").classList.add("show"); };
  reader.readAsDataURL(file);
});

listen("productForm", "submit", async e => {
  e.preventDefault();
  if (!canManageProducts()) return toast("Solo administrador puede guardar productos");
  try {
    if (!isOnline()) throw new Error("offline");
    const product = await productPayloadFromForm(false);
    await requireOk(await supabase.from("products").upsert(product));
    resetProductForm();
    setProductFormMode("new");
    closeProductForm();
    await refresh({ preserveView: true });
  } catch (err) {
    try {
      const product = await productPayloadFromForm(true);
      applyLocalProduct(product);
      queueOfflineChange({ type: "product_upsert", product });
      resetProductForm();
      setProductFormMode("new");
      closeProductForm();
      toast("Producto guardado offline.");
    } catch (validationErr) {
      toast(validationErr.message || err.message);
    }
  }
});

function resetServiceForm() {
  $("serviceForm").reset();
  $("serviceId").value = "";
  $("serviceCustomAmount").checked = false;
}

listen("serviceForm", "submit", async e => {
  e.preventDefault();
  if (!canUseView("services")) return toast("No tienes permiso para guardar servicios");
  const service = servicePayloadFromForm();
  try {
    if (!isOnline()) throw new Error("offline");
    await requireOk(await supabase.from("service_catalog").upsert(service));
    resetServiceForm();
    await refresh();
  } catch (err) {
    applyLocalService(service);
    queueOfflineChange({ type: "service_upsert", service });
    resetServiceForm();
    toast("Servicio guardado offline.");
  }
});

window.editService = (id) => {
  const service = state.services.find(item => item.id === id);
  if (!service) return;
  $("serviceId").value = service.id;
  $("serviceCompany").value = service.company;
  $("serviceType").value = service.type;
  $("serviceName").value = service.name;
  $("serviceCustomAmount").checked = !!service.custom_amount;
  $("serviceYvrCode").value = service.yvr_product_code || "";
  $("serviceYvrEnabled").checked = !!service.yvr_enabled;
  $("serviceSalePrice").value = service.custom_amount ? Number(service.commission_pct || 0) : Number(service.sale_price || 0);
  $("serviceCost").value = service.custom_amount ? 0 : Number(service.cost || 0);
  showView("services");
};

window.deleteService = async (id) => {
  if (!confirm("Eliminar servicio? Se desactivara para conservar el historial de ventas.")) return;
  state.services = state.services.filter(item => item.id !== id);
  saveCache();
  renderAll();
  try {
    if (!isOnline()) throw new Error("offline");
    await requireOk(await supabase.from("service_catalog").update({ active: false }).eq("id", id));
    await refresh();
  } catch (err) {
    queueOfflineChange({ type: "service_delete", service_id: id });
    toast("Servicio eliminado localmente.");
  }
};

window.editProduct = (id) => {
  if (!canManageProducts()) return toast("Solo administrador puede editar productos");
  const product = state.products.find(entry => entry.id === id);
  fillProductForm(product);
  setProductFormMode("edit");
  if ($("stockProduct")) {
    $("stockProduct").value = product.id;
    renderSelectedStockProduct();
  }
  closeProductDetailPanel();
  showView("stock");
  openProductForm("name");
};

window.selectCatalogProduct = (id) => {
  state.selectedProductId = id;
  renderProducts();
  openProductDetailPanel();
};

window.toggleProductSaleVisibility = async (id) => {
  if (!canManageProducts()) return toast("Solo administrador puede cambiar visibilidad");
  const product = state.products.find(entry => entry.id === id);
  if (!product) return toast("Producto no encontrado");
  const active = product.active === false;
  product.active = active;
  saveCache();
  renderAll();
  try {
    if (!isOnline()) throw new Error("offline");
    await requireOk(await supabase.from("products").update({ active }).eq("id", id));
    await refresh({ preserveView: true });
    toast(active ? "Producto visible en Venta" : "Producto oculto de Venta");
  } catch (err) {
    queueOfflineChange({ type: "product_deactivate", product_id: id, active });
    toast(active ? "Producto se mostrara en Venta al sincronizar" : "Producto oculto de Venta localmente");
  }
};

window.deleteProduct = async (id) => {
  if (!canManageProducts()) return toast("Solo administrador puede eliminar productos");
  if (!confirm("Eliminar producto definitivamente? Se quitara tambien su referencia del historial.")) return;
  state.products = state.products.filter(entry => entry.id !== id);
  saveCache();
  renderAll();
  try {
    if (!isOnline()) throw new Error("offline");
    await requireOk(await supabase.from("products").delete().eq("id", id));
    await refresh();
    toast("Producto eliminado");
  } catch (err) {
    const queue = offlineQueue();
    if (!queue.some(item => item.type === "product_delete" && item.product_id === id)) {
      queue.push({ id: crypto.randomUUID(), type: "product_delete", product_id: id, created_at: new Date().toISOString() });
      setOfflineQueue(queue);
    }
    toast("Producto eliminado localmente. Se borrara en Supabase al volver internet.");
  }
};

listen("stockForm", "submit", async e => {
  e.preventDefault();
  if (!canManageProducts()) return toast("Solo administrador puede actualizar stock");
  const product = state.products.find(entry => entry.id === $("stockProduct").value);
  const qty = Number($("stockQty").value);
  let stock = product.stock;
  if ($("stockType").value === "Entrada") stock += qty;
  else if ($("stockType").value === "Salida") stock -= qty;
  else stock = qty;
  if (stock < 0) return toast("Stock insuficiente");
  const moveType = $("stockType").value;
  const reason = $("stockReason").value;
  try {
    if (!isOnline()) throw new Error("offline");
    await requireOk(await supabase.from("products").update({ stock }).eq("id", product.id));
    await requireOk(await supabase.from("stock_movements").insert({
      product_id: product.id,
      user_id: state.user.id,
      type: moveType,
      qty,
      stock_after: stock,
      reason,
    }));
    e.target.reset();
    await refresh();
  } catch (err) {
    product.stock = stock;
    queueOfflineChange({
      type: "stock_movement",
      product_id: product.id,
      user_id: state.user.id,
      move_type: moveType,
      qty,
      stock_after: stock,
      reason,
    });
    e.target.reset();
    renderAll();
    toast("Movimiento de inventario guardado offline.");
  }
});

async function loadUsers() {
  if (!isAdmin()) {
    $("usersTable").innerHTML = "";
    return toast("Solo administrador puede ver usuarios");
  }
  const users = await requireOk(await supabase.from("profiles").select("*").order("name"));
  state.profiles = users;
  renderUsers(users);
}

function userInitials(user) {
  return String(user.name || user.username || "U")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0]?.toUpperCase())
    .join("") || "U";
}

function renderUsers(users = state.profiles) {
  if (!$("usersTable")) return;
  const term = ($("usersSearch")?.value || "").trim().toLowerCase();
  const roleFilter = $("usersRoleFilter")?.value || "all";
  const filtered = users
    .filter(user => !term || `${user.name} ${user.username} ${user.role}`.toLowerCase().includes(term))
    .filter(user => roleFilter === "all" || normalizeRole(user.role) === roleFilter);
  const active = users.filter(user => user.active !== false).length;
  if ($("usersTotal")) $("usersTotal").textContent = users.length;
  if ($("usersActive")) $("usersActive").textContent = active;
  if ($("usersActiveHint")) $("usersActiveHint").textContent = users.length ? `${((active / users.length) * 100).toFixed(1)}% del total` : "0% del total";
  if ($("usersFootText")) $("usersFootText").textContent = `Mostrando ${filtered.length} de ${users.length} usuarios`;
  $("usersTable").innerHTML = filtered.map(user => {
    const role = normalizeRole(user.role);
    const activeStatus = user.active !== false;
    return `<tr>
      <td><div class="user-cell"><span class="user-avatar">${userInitials(user)}</span><b>${user.username}</b></div></td>
      <td>${user.name}</td>
      <td><span class="user-role ${role === "Administrador" ? "admin" : "collab"}">${role}</span></td>
      <td><span class="user-status ${activeStatus ? "active" : "inactive"}"><i></i>${activeStatus ? "Activo" : "Inactivo"}</span></td>
      <td>${localDateTime(user.updated_at || user.created_at || new Date())}</td>
      <td><button class="catalog-icon-btn" onclick="editUser('${user.id}', '${user.name}', '${user.username}', '${role}', ${activeStatus})" title="Editar">✎</button></td>
    </tr>`;
  }).join("") || `<tr><td colspan="6">No se encontraron usuarios.</td></tr>`;
}

window.editUser = (id, name, username, role, active = true) => {
  $("userId").value = id;
  $("userName").value = name;
  $("username").value = username;
  $("userRole").value = normalizeRole(role);
  $("password").value = "";
  if ($("userActive")) $("userActive").checked = active !== false;
};

listen("userForm", "submit", async e => {
  e.preventDefault();
  if (!isAdmin()) return toast("Solo administrador puede guardar usuarios");
  try {
    await requireOk(await supabase.functions.invoke("admin-create-user", {
      body: { id: $("userId").value || null, name: $("userName").value, username: $("username").value, password: $("password").value, role: $("userRole").value, active: $("userActive")?.checked !== false },
    }));
    e.target.reset();
    $("userId").value = "";
    await loadUsers();
  } catch (err) {
    const message = String(err.message || "");
    if (message.includes("Failed to send a request to the Edge Function")) {
      return toast("Falta desplegar la funcion admin-create-user en Supabase");
    }
    toast(message);
  }
});

function setReportTab(tab = "summary") {
  activeReportTab = ["summary", "sales", "products", "inventory", "clients", "payments"].includes(tab) ? tab : "summary";
  document.querySelectorAll("[data-report-tab]").forEach(button => button.classList.toggle("active", button.dataset.reportTab === activeReportTab));
  if ($("reportMetric")) {
    if (activeReportTab === "sales") $("reportMetric").value = "sales";
    if (activeReportTab === "products") $("reportMetric").value = "units";
  }
  generateReport();
}

function reportFilteredSales(range, offset = 0) {
  const cashierId = $("reportCashier")?.value || "all";
  const payment = $("reportPaymentFilter")?.value || "all";
  const category = $("reportCategoryFilter")?.value || "all";
  let sales = salesInRange(range, offset);
  if (cashierId !== "all") sales = sales.filter(sale => sale.user_id === cashierId);
  if (payment !== "all") sales = sales.filter(sale => sale.payment_method === payment);
  if (category !== "all") {
    const saleIds = new Set((state.reports.sale_items || [])
      .filter(item => categoryShort(state.products.find(product => product.id === item.product_id)?.category || "Otros") === category)
      .map(item => item.sale_id));
    sales = sales.filter(sale => saleIds.has(sale.id));
  }
  return sales;
}

function populateReportCategoryFilter() {
  if (!$("reportCategoryFilter")) return;
  const current = $("reportCategoryFilter").value || "all";
  const categories = [...new Set(state.products.map(product => categoryShort(product.category)).filter(Boolean))].sort();
  $("reportCategoryFilter").innerHTML = `<option value="all">Todas</option>` + categories.map(category => `<option value="${category}">${category}</option>`).join("");
  $("reportCategoryFilter").value = categories.includes(current) ? current : "all";
}

function reportTopRows(saleIds) {
  return productSummaryForSales(saleIds).map(item => ({
    ...item,
    product: state.products.find(product => product.name === item.name || product.id === item.product_id),
  }));
}

function generateReport() {
  if (!$("reportOutput")) return;
  populateReportCategoryFilter();
  const range = dateRangeFromInputs("reportStartDate", "reportEndDate", 7);
  const compare = $("reportCompare")?.value || "previous";
  const sales = reportFilteredSales(range, 0);
  const previousSales = compare === "none" ? [] : reportFilteredSales(range, 1);
  const current = dashboardSummary(sales);
  const previous = dashboardSummary(previousSales);
  const saleIds = new Set(sales.map(sale => sale.id));
  const soldProductRows = productSummaryForSales(saleIds);
  const topRows = soldProductRows.slice(0, 5);
  const products = state.products || [];
  const colors = ["#2563eb", "#22c55e", "#6d42d9", "#f59e0b", "#06b6d4"];
  const metric = $("reportMetric")?.value || "sales";

  if ($("reportRangeLabel")) $("reportRangeLabel").value = range.label;
  if ($("reportSold")) $("reportSold").textContent = fmt(current.total);
  if ($("reportTickets")) $("reportTickets").textContent = current.tickets;
  if ($("reportUnits")) $("reportUnits").textContent = current.units;
  if ($("reportCustomers")) $("reportCustomers").textContent = state.profiles.length || 1;
  if ($("reportAverage")) $("reportAverage").textContent = fmt(current.average);
  if ($("reportSalesTrend")) $("reportSalesTrend").innerHTML = trendHtml(current.total, previous.total);
  if ($("reportOrdersTrend")) $("reportOrdersTrend").innerHTML = trendHtml(current.tickets, previous.tickets);
  if ($("reportUnitsTrend")) $("reportUnitsTrend").innerHTML = trendHtml(current.units, previous.units);
  if ($("reportAverageTrend")) $("reportAverageTrend").innerHTML = trendHtml(current.average, previous.average);
  if ($("reportLineChart")) $("reportLineChart").innerHTML = lineChartHtml(dashboardDailyPoints(sales, range.days, metric), metric);

  const categoryRows = [];
  current.items.forEach(item => {
    const label = categoryShort(products.find(product => product.id === item.product_id)?.category || "Otros");
    const row = categoryRows.find(entry => entry.label === label) || { label, value: 0 };
    row.value += Number(item.line_total || 0);
    if (!categoryRows.includes(row)) categoryRows.push(row);
  });
  categoryRows.sort((a, b) => b.value - a.value);
  if ($("reportCategoryDonut")) $("reportCategoryDonut").setAttribute("style", donutStyle(categoryRows.slice(0, 5), colors));
  if ($("reportCategoryLegend")) $("reportCategoryLegend").innerHTML = renderLegend(categoryRows.slice(0, 5), colors, current.total, fmt);

  if ($("reportTopProducts")) $("reportTopProducts").innerHTML = topRows.map((item, index) => {
    const product = products.find(entry => entry.name === item.name);
    return `<tr><td>${index + 1}</td><td><div class="table-product"><img class="thumb" src="${safeImageUrl(product?.image_url)}" alt="${item.name}"><b>${item.name}</b></div></td><td>${categoryShort(product?.category || "Otros")}</td><td>${item.units}</td><td>${fmt(item.sold)}</td></tr>`;
  }).join("") || `<tr><td colspan="5">Sin productos vendidos.</td></tr>`;

  const paymentRows = ["Efectivo", "Tarjeta", "Transferencia"].map(label => ({
    label,
    value: sales.filter(sale => sale.payment_method === label).reduce((sum, sale) => sum + Number(sale.total || 0), 0),
  })).filter(row => row.value > 0);
  if ($("reportPaymentDonut")) $("reportPaymentDonut").setAttribute("style", donutStyle(paymentRows, ["#2563eb", "#22c55e", "#6d42d9"]));
  if ($("reportPaymentLegend")) $("reportPaymentLegend").innerHTML = renderLegend(paymentRows, ["#2563eb", "#22c55e", "#6d42d9"], current.total, fmt);

  const rows = [
    ["Ventas totales", current.total, previous.total, fmt],
    ["Ordenes", current.tickets, previous.tickets, (n) => n],
    ["Productos vendidos", current.units, previous.units, (n) => n],
    ["Ticket promedio", current.average, previous.average, fmt],
    ["Clientes", state.profiles.length || 1, state.profiles.length || 1, (n) => n],
  ];
  if ($("reportSummaryRows")) $("reportSummaryRows").innerHTML = rows.map(([label, now, before, formatter]) => {
    const variation = Number(now) - Number(before);
    return `<tr><td>${label}</td><td>${formatter(now)}</td><td>${formatter(before)}</td><td class="${variation >= 0 ? "positive" : "negative"}">${formatter(variation)}</td><td class="${variation >= 0 ? "positive" : "negative"}">${percentChange(now, before)}</td></tr>`;
  }).join("");

  const inStock = products.filter(product => Number(product.stock || 0) > Number(product.min_stock || 0)).length;
  const lowStock = products.filter(product => Number(product.stock || 0) > 0 && Number(product.stock || 0) <= Number(product.min_stock || 0)).length;
  const outStock = products.filter(product => Number(product.stock || 0) <= 0).length;
  const inventory = inventoryTotals();
  if ($("reportInventoryKpis")) $("reportInventoryKpis").innerHTML = [
    ["Productos en stock", inStock, "#22c55e"],
    ["Stock bajo", lowStock, "#f59e0b"],
    ["Sin stock", outStock, "#ef4444"],
    ["Valor del inventario", fmt(inventory.cost), "#2563eb"],
  ].map(([label, value, color]) => `<article><i style="color:${color}">▣</i><span>${label}</span><strong>${value}</strong></article>`).join("");

  $("salesList").innerHTML = sales.slice(0, 50).map(saleCardHtml).join("") || "<p>Sin ventas</p>";
  $("reportOutput").classList.remove("hidden");
  $("reportOutput").innerHTML = reportOutputHtml(activeReportTab, { range, sales, current, previous, soldProductRows, paymentRows, categoryRows, products });
}

function productSummaryForSales(saleIds) {
  const map = new Map();
  (state.reports.sale_items || [])
    .filter(item => saleIds.has(item.sale_id))
    .forEach(item => {
      const product = state.products.find(entry => entry.id === item.product_id);
      const row = map.get(item.product_name) || {
        name: item.product_name,
        image_url: safeImageUrl(product?.image_url),
        units: 0,
        sold: 0,
        profit: 0,
      };
      row.units += item.qty * item.units_per_sale;
      row.sold += Number(item.line_total);
      row.profit += Number(item.line_total) - Number(item.line_cost);
      map.set(item.product_name, row);
    });
  return [...map.values()].sort((a, b) => b.units - a.units);
}

function reportSaleItems(saleId) {
  return (state.reports.sale_items || []).filter(item => item.sale_id === saleId);
}

function reportSummaryCards(current, sales) {
  return `<div class="report-summary">
    <article><span>Tickets</span><strong>${sales.length}</strong></article>
    <article><span>Total vendido</span><strong>${fmt(current.total)}</strong></article>
    <article><span>Productos vendidos</span><strong>${current.units}</strong></article>
  </div>`;
}

function ticketGroupsHtml(sales) {
  if (!sales.length) return `<p class="empty-state">Sin tickets en este rango.</p>`;
  return `<div class="ticket-report-list">${sales.map(sale => {
    const items = reportSaleItems(sale.id);
    const customer = sale.customer_name || sale.customer || "Sin cliente";
    const delivery = sale.fulfillment_type || sale.delivery_type || "Sin entrega";
    return `<section class="ticket-report-block">
      <div class="ticket-report-head">
        <div><h4>Ticket ${escapeHtml(sale.ticket || sale.id)}</h4><p>${escapeHtml(localDateTime(sale.created_at))} - ${escapeHtml(profileName(sale.user_id))}</p></div>
        <div><strong>${fmt(sale.total)}</strong><p>${escapeHtml(sale.payment_method || "Sin pago")} - ${escapeHtml(delivery)}</p></div>
      </div>
      <table>
        <thead><tr><th>Producto</th><th>SKU</th><th>Cantidad</th><th>Precio</th><th>Total</th><th>Ganancia</th></tr></thead>
        <tbody>${items.map(item => {
          const units = Number(item.qty || 0) * Number(item.units_per_sale || 1);
          const unitPrice = Number(item.unit_price || 0);
          const lineTotal = Number(item.line_total || 0);
          const profit = lineTotal - Number(item.line_cost || 0);
          return `<tr><td>${escapeHtml(item.product_name || "Producto")}</td><td>${escapeHtml(item.product_code || "")}</td><td>${units}</td><td>${fmt(unitPrice)}</td><td>${fmt(lineTotal)}</td><td>${fmt(profit)}</td></tr>`;
        }).join("") || `<tr><td colspan="6">Sin productos registrados en este ticket</td></tr>`}</tbody>
      </table>
      <div class="ticket-report-total">
        <span>Cliente: ${escapeHtml(customer)}</span>
        <span>Subtotal: ${fmt(sale.subtotal)}</span>
        <span>Descuento: -${fmt(sale.discount_amount || sale.discount)}</span>
        <span>IVA: ${fmt(sale.tax)}</span>
        <strong>Total: ${fmt(sale.total)}</strong>
      </div>
    </section>`;
  }).join("")}</div>`;
}

function productReportTable(rows) {
  return `<table><thead><tr><th>Producto</th><th>Cantidad</th><th>Monto vendido</th><th>Ganancia</th></tr></thead><tbody>${
    rows.map(item => `<tr><td>${escapeHtml(item.name)}</td><td>${item.units}</td><td>${fmt(item.sold)}</td><td>${fmt(item.profit)}</td></tr>`).join("") || `<tr><td colspan="4">Sin productos vendidos</td></tr>`
  }</tbody></table>`;
}

function inventoryReportTable(products) {
  const rows = [...products].sort((a, b) => Number(a.stock || 0) - Number(b.stock || 0));
  return `<table><thead><tr><th>Producto</th><th>Categoria</th><th>Stock</th><th>Costo</th><th>Precio venta</th><th>Valor costo</th><th>Estado</th></tr></thead><tbody>${
    rows.map(product => {
      const status = stockStatus(product);
      return `<tr><td>${escapeHtml(product.name)}<br><small>SKU: ${escapeHtml(product.code)}</small></td><td>${escapeHtml(categoryShort(product.category))}</td><td>${Number(product.stock || 0)}</td><td>${fmt(product.purchase_price)}</td><td>${fmt(product.sale_price)}</td><td>${fmt(Number(product.purchase_price || 0) * Number(product.stock || 0))}</td><td>${escapeHtml(status.label)}</td></tr>`;
    }).join("") || `<tr><td colspan="7">Sin productos</td></tr>`
  }</tbody></table>`;
}

function clientsReportTable(sales) {
  const map = new Map();
  sales.forEach(sale => {
    const key = sale.customer_name || sale.customer || "Sin cliente";
    const row = map.get(key) || { name: key, tickets: 0, total: 0 };
    row.tickets += 1;
    row.total += Number(sale.total || 0);
    map.set(key, row);
  });
  const rows = [...map.values()].sort((a, b) => b.total - a.total);
  return `<table><thead><tr><th>Cliente</th><th>Tickets</th><th>Total comprado</th></tr></thead><tbody>${
    rows.map(row => `<tr><td>${escapeHtml(row.name)}</td><td>${row.tickets}</td><td>${fmt(row.total)}</td></tr>`).join("") || `<tr><td colspan="3">Sin clientes en este rango</td></tr>`
  }</tbody></table>`;
}

function paymentsReportTable(paymentRows, total) {
  return `<table><thead><tr><th>Metodo de pago</th><th>Participacion</th><th>Total</th></tr></thead><tbody>${
    paymentRows.map(row => `<tr><td>${escapeHtml(row.label)}</td><td>${total ? ((row.value / total) * 100).toFixed(1) : "0.0"}%</td><td>${fmt(row.value)}</td></tr>`).join("") || `<tr><td colspan="3">Sin pagos en este rango</td></tr>`
  }</tbody></table>`;
}

function reportOutputHtml(tab, data) {
  const { range, sales, current, soldProductRows, paymentRows, products } = data;
  const titleMap = {
    summary: "Reporte resumen",
    sales: "Reporte de ventas",
    products: "Reporte de productos",
    inventory: "Reporte de inventario",
    clients: "Reporte de clientes",
    payments: "Reporte de pagos",
  };
  const header = `<div class="report-header"><h2>${titleMap[tab] || titleMap.summary}</h2><p>Rango: ${range.label}</p></div>${reportSummaryCards(current, sales)}`;
  if (tab === "products") return `${header}<h3>Productos vendidos</h3>${productReportTable(soldProductRows)}<h3>Tickets agrupados</h3>${ticketGroupsHtml(sales)}`;
  if (tab === "inventory") return `${header}<h3>Inventario actual</h3>${inventoryReportTable(products)}`;
  if (tab === "clients") return `${header}<h3>Clientes</h3>${clientsReportTable(sales)}<h3>Tickets agrupados</h3>${ticketGroupsHtml(sales)}`;
  if (tab === "payments") return `${header}<h3>Pagos</h3>${paymentsReportTable(paymentRows, current.total)}<h3>Tickets agrupados</h3>${ticketGroupsHtml(sales)}`;
  if (tab === "sales") return `${header}<h3>Tickets agrupados</h3>${ticketGroupsHtml(sales)}`;
  return `${header}<h3>Productos vendidos</h3>${productReportTable(soldProductRows)}<h3>Tickets agrupados</h3>${ticketGroupsHtml(sales)}`;
}

function printHiddenDocument(title, bodyHtml, styles) {
  const frame = document.createElement("iframe");
  frame.style.position = "fixed";
  frame.style.right = "0";
  frame.style.bottom = "0";
  frame.style.width = "0";
  frame.style.height = "0";
  frame.style.border = "0";
  document.body.appendChild(frame);
  const doc = frame.contentWindow?.document;
  if (!doc) {
    frame.remove();
    toast("Venta registrada. No se pudo preparar el ticket.");
    return;
  }
  doc.open();
  doc.write(`<html><head><title>${title}</title><style>${styles}</style></head><body>${bodyHtml}</body></html>`);
  doc.close();
  setTimeout(() => {
    try {
      frame.contentWindow?.focus();
      frame.contentWindow?.print();
    } catch (err) {
      console.warn("No se pudo imprimir automaticamente", err);
      toast("Venta registrada. No se pudo imprimir automaticamente.");
    } finally {
      setTimeout(() => frame.remove(), 1500);
    }
  }, 250);
}

function printTicket(saleResult, cartSnapshot, paymentAmount, totalSnapshot) {
  const data = totalSnapshot;
  const customer = $("saleCustomer")?.value?.trim();
  const fulfillment = $("saleFulfillment")?.value || "Contraentrega";
  const ticketHtml = `
    <div class="ticket">
      <h2>POS SV</h2>
      <p>Ticket: ${saleResult.ticket}</p>
      <p>Fecha: ${localDateTime(new Date())}</p>
      <p>Cajero: ${state.user.name}</p>
      ${customer ? `<p>Cliente: ${customer}</p>` : ""}
      <p>Entrega: ${fulfillment}</p>
      <hr>
      ${cartSnapshot.map(item => `
        <p><b>${item.product_name}</b><br>${item.qty} x ${item.label}${item.item_type === "service" ? "" : ` (${item.units_per_sale * item.qty} unidades)`} ${fmt(item.unit_price * item.qty)}</p>
      `).join("")}
      <hr>
      <p>Subtotal: ${fmt(data.subtotal)}</p>
      <p>Descuento: -${fmt(data.discount)}</p>
      <p>IVA 13%: ${fmt(data.tax)}</p>
      <p><b>Total: ${fmt(data.total)}</b></p>
      <p>Pago: ${fmt(paymentAmount)}</p>
      <p>Cambio: ${fmt(saleResult.change)}</p>
    </div>`;
  printHiddenDocument(`Ticket ${saleResult.ticket}`, ticketHtml, `
      body{font-family:Arial,sans-serif;margin:10px;color:#111}
      .ticket{width:280px}
      h2{text-align:center;margin:0 0 8px}
      p{font-size:13px;margin:5px 0}
      hr{border:0;border-top:1px dashed #999;margin:8px 0}
      @media print{body{margin:0}.ticket{width:72mm;padding:3mm}}
    `);
}

function profileName(id) {
  return state.profiles.find(profile => profile.id === id)?.name || "Cajero";
}

function printReport() {
  generateReport();
  const win = window.open("", "_blank", "width=900,height=700");
  if (!win?.document) return toast("No se pudo abrir la ventana del reporte");
  win.document.write(`
    <html><head><title>Reporte POS</title><style>
      body{font-family:Arial,sans-serif;margin:24px;color:#14202b}
      table{width:100%;border-collapse:collapse;margin:12px 0 22px}
      th,td{border-bottom:1px solid #d8e0e8;text-align:left;padding:8px}
      img{width:38px;height:38px;object-fit:cover;border-radius:6px}
      .ticket-list{display:grid;gap:10px}
      .ticket-card{border:1px solid #d8e0e8;border-radius:6px;padding:10px;margin-bottom:10px}
      .ticket-head,.ticket-foot{display:flex;justify-content:space-between;gap:10px}
      .ticket-item,.table-product{display:flex;align-items:center;gap:8px;border-top:1px solid #d8e0e8;padding-top:6px;margin-top:6px}
      .report-summary{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin:14px 0}
      article{border:1px solid #d8e0e8;padding:10px;border-radius:6px}
      span{display:block;color:#627083;font-size:12px;text-transform:uppercase}
    </style></head><body>${$("reportOutput").innerHTML}</body></html>`);
  win.document.close();
  win.focus();
  win.print();
}

document.querySelector('[data-view="users"]').addEventListener("click", loadUsers);
listen("generateReportBtn", "click", generateReport);
listen("printReportBtn", "click", printReport);
listen("reportDate", "change", generateReport);
listen("reportCashier", "change", generateReport);
listen("reloadAhorroBtn", "click", () => {
  if (window.techPOS?.openZonaDigital) {
    window.techPOS.openZonaDigital();
    return;
  }
  if (!$("ahorroWebview").classList.contains("hidden") && typeof $("ahorroWebview").reload === "function") {
    $("ahorroWebview").reload();
    return;
  }
  $("ahorroFrame").src = EXTERNAL_SITE_URL;
});
listen("importAhorroBtn", "click", importAhorroToInventory);
document.addEventListener("visibilitychange", () => {
  if (!document.hidden && state.session) scheduleRefresh("ventana activa");
});
window.addEventListener("online", async () => {
  renderSyncStatus();
  setupRealtime();
  setupRefreshPulse();
  await syncOfflineSales();
  await refresh();
});
window.addEventListener("offline", renderSyncStatus);
supabase.auth.onAuthStateChange((_event, session) => { state.session = session; });
bootstrap().catch((err) => {
  console.error("No se pudo iniciar la aplicacion", err);
  renderSyncStatus();
  $("login").classList.remove("hidden");
  $("app").classList.add("hidden");
  toast("No se pudo conectar. Revisa internet e intenta entrar de nuevo.");
});
