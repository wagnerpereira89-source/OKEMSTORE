import { useState } from 'react'
import { MoreVertical, Package, X, Check } from 'lucide-react'
import { buildVariationName, formatStock } from '../utils/formatters'

// ─── Seletor de foto principal da variação ──────────────────────────────────
function VariationPhotoPicker({ productPhotos, selectedId, onChange }) {
  // Só fotos já salvas (com id)
  const available = productPhotos.filter((p) => p.id)

  if (available.length === 0) {
    return (
      <div className="text-xs text-[#9A9A9A] bg-[#242424] rounded-lg p-3 text-center">
        Adicione fotos ao produto primeiro para poder escolher uma para esta variação.
      </div>
    )
  }

  return (
    <div>
      <p className="text-[12px] font-medium text-[#C4C4C4] mb-2">Foto desta variação</p>
      <div className="grid grid-cols-4 gap-2">
        {available.map((p) => {
          const isSelected = selectedId === p.id
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => onChange(isSelected ? null : p.id)}
              className={`relative aspect-square rounded-lg overflow-hidden bg-[#242424] transition-all ${
                isSelected ? 'ring-2 ring-primary' : 'opacity-60 hover:opacity-100'
              }`}
            >
              <img src={p.src || p.preview} alt="" className="w-full h-full object-cover pointer-events-none" />
              {isSelected && (
                <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                  <div className="bg-primary rounded-full p-1">
                    <Check size={14} className="text-white" />
                  </div>
                </div>
              )}
            </button>
          )
        })}
      </div>
      <p className="text-[11px] text-[#9A9A9A] mt-2">
        Toque para escolher. Toque novamente para usar a padrão do produto.
      </p>
    </div>
  )
}

// ─── Modal de edição ─────────────────────────────────────────────────────────
function EditVariationModal({ variation, productPhotos, onSave, onClose }) {
  const [form, setForm] = useState({
    regular_price: variation.regular_price || '',
    sale_price: variation.sale_price || '',
    stock_quantity: variation.stock_quantity ?? '',
    weight: variation.weight || '',
    length: variation.dimensions?.length || '',
    width: variation.dimensions?.width || '',
    height: variation.dimensions?.height || '',
    sku: variation.sku || '',
    imageId: variation.image?.id || null,
  })

  const set = (k, v) => setForm((prev) => ({ ...prev, [k]: v }))

  const handleSave = () => {
    onSave({
      ...variation,
      regular_price: form.regular_price,
      sale_price: form.sale_price,
      stock_quantity: form.stock_quantity !== '' ? parseInt(form.stock_quantity, 10) : null,
      manage_stock: form.stock_quantity !== '',
      weight: form.weight,
      sku: form.sku,
      dimensions: {
        length: form.length,
        width: form.width,
        height: form.height,
      },
      image: form.imageId ? { id: form.imageId } : null,
    })
    onClose()
  }

  const inputClass =
    'w-full h-11 px-3 text-sm bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-[#9A9A9A]'

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40">
      <div className="bg-[#1A1A1A] w-full max-w-mobile rounded-t-2xl p-5 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-base font-semibold text-[#F5F5F0]">
            Editar: {buildVariationName(variation)}
          </p>
          <button onClick={onClose} className="text-[#9A9A9A] hover:text-[#C4C4C4]">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          {/* Seletor de foto */}
          <VariationPhotoPicker
            productPhotos={productPhotos || []}
            selectedId={form.imageId}
            onChange={(id) => set('imageId', id)}
          />

          {/* SKU */}
          <div className="flex flex-col gap-1">
            <label className="text-[12px] font-medium text-[#C4C4C4]">SKU</label>
            <input
              value={form.sku}
              onChange={(e) => set('sku', e.target.value)}
              placeholder="Ex: BLU-001"
              className={inputClass}
            />
          </div>

          {/* Preços */}
          <p className="text-[13px] font-semibold text-[#F5F5F0]">Preços</p>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-[12px] font-medium text-[#C4C4C4]">Preço de venda</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#C4C4C4]">R$</span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={form.regular_price}
                  onChange={(e) => set('regular_price', e.target.value)}
                  placeholder="0,00"
                  className="w-full h-11 pl-9 pr-3 text-sm bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-[#9A9A9A]"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[12px] font-medium text-[#C4C4C4]">Preço promocional</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#C4C4C4]">R$</span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={form.sale_price}
                  onChange={(e) => set('sale_price', e.target.value)}
                  placeholder="0,00"
                  className="w-full h-11 pl-9 pr-3 text-sm bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-[#9A9A9A]"
                />
              </div>
            </div>
          </div>

          {/* Estoque */}
          <div className="flex flex-col gap-1">
            <label className="text-[12px] font-medium text-[#C4C4C4]">Estoque</label>
            <input
              type="number"
              min="0"
              value={form.stock_quantity}
              onChange={(e) => set('stock_quantity', e.target.value)}
              placeholder="Ex: 10"
              className={inputClass}
            />
          </div>

          {/* Peso e dimensões */}
          <p className="text-[13px] font-semibold text-[#F5F5F0]">Peso e dimensões</p>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-[12px] font-medium text-[#C4C4C4]">Peso</label>
              <div className="relative">
                <input
                  type="number"
                  step="0.001"
                  min="0"
                  value={form.weight}
                  onChange={(e) => set('weight', e.target.value)}
                  placeholder="0.00"
                  className="w-full h-11 px-3 pr-10 text-sm bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-[#9A9A9A]"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#9A9A9A]">kg</span>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[12px] font-medium text-[#C4C4C4]">Comprimento</label>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  value={form.length}
                  onChange={(e) => set('length', e.target.value)}
                  placeholder="0"
                  className="w-full h-11 px-3 pr-10 text-sm bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-[#9A9A9A]"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#9A9A9A]">cm</span>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[12px] font-medium text-[#C4C4C4]">Largura</label>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  value={form.width}
                  onChange={(e) => set('width', e.target.value)}
                  placeholder="0"
                  className="w-full h-11 px-3 pr-10 text-sm bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-[#9A9A9A]"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#9A9A9A]">cm</span>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[12px] font-medium text-[#C4C4C4]">Altura</label>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  value={form.height}
                  onChange={(e) => set('height', e.target.value)}
                  placeholder="0"
                  className="w-full h-11 px-3 pr-10 text-sm bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-[#9A9A9A]"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#9A9A9A]">cm</span>
              </div>
            </div>
          </div>
        </div>

        {/* Botões */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 h-11 border border-[#2E2E2E] rounded-xl text-sm text-[#C4C4C4] hover:bg-[#242424]"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="flex-1 h-11 bg-primary text-[#141414] rounded-xl text-sm font-medium hover:bg-[#CFCFCF]"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  )
}

export function VariationCard({ variation, productPhotos, onEdit, onDelete }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const name = buildVariationName(variation)

  const handleEdit = () => {
    setMenuOpen(false)
    setEditOpen(true)
  }

  const handleSave = (updated) => {
    onEdit?.(updated)
  }

  return (
    <>
      <div className="flex items-center gap-3 p-3 border border-[#2E2E2E] rounded-xl">
        <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-[#242424]">
          {variation.image?.src ? (
            <img src={variation.image.src} alt={name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#9A9A9A]">
              <Package size={14} />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-[#F5F5F0] truncate">{name}</p>
          <p className="text-xs text-[#9A9A9A]">
            {variation.manage_stock || variation.stock_quantity != null
              ? `Estoque: ${formatStock(variation.stock_quantity)}`
              : '∞ Infinito'}
          </p>
        </div>
        <div className="relative">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="p-1 rounded text-[#9A9A9A] hover:text-[#C4C4C4]"
          >
            <MoreVertical size={16} />
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-full mt-1 bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl shadow-lg z-10 min-w-[140px]">
              <button
                onClick={handleEdit}
                className="w-full text-left px-4 py-2 text-sm hover:bg-[#242424]"
              >
                Editar
              </button>
              <button
                onClick={() => { onDelete?.(variation); setMenuOpen(false) }}
                className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-[#242424]"
              >
                Excluir
              </button>
            </div>
          )}
        </div>
      </div>

      {editOpen && (
        <EditVariationModal
          variation={variation}
          productPhotos={productPhotos}
          onSave={handleSave}
          onClose={() => setEditOpen(false)}
        />
      )}
    </>
  )
}
