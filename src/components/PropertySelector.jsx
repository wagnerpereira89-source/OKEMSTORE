import { X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { saveAttributesDraft, saveFormDraft } from '../utils/attributesStore'

export function PropertySelector({ attributes = [], onRemoveValue, onRemoveAttribute, formSnapshot }) {
  const navigate = useNavigate()

  const goToProperties = () => {
    // Salva atributos atuais
    saveAttributesDraft(attributes)
    // Salva o formulário inteiro para restaurar ao voltar
    if (formSnapshot) {
      saveFormDraft(formSnapshot)
    }
    navigate('/properties')
  }

  if (attributes.length === 0) {
    return (
      <div>
        <p className="text-sm text-[#9A9A9A] mb-3">Sem propriedades ainda</p>
        <button
          type="button"
          onClick={goToProperties}
          className="text-sm text-action hover:underline"
        >
          Adicionar variações
        </button>
      </div>
    )
  }

  return (
    <div>
      {attributes.map((attr) => (
        <div key={attr.id || attr.name} className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-[#F5F5F0]">{attr.name}</span>
            {onRemoveAttribute && (
              <button
                type="button"
                onClick={() => onRemoveAttribute(attr)}
                className="text-[#9A9A9A] hover:text-red-500"
              >
                <X size={14} />
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {attr.options?.map((val) => (
              <span
                key={val}
                className="inline-flex items-center gap-1 bg-[#242424] text-[#C4C4C4] text-sm px-3 py-1 rounded-full"
              >
                {val}
                {onRemoveValue && (
                  <button
                    type="button"
                    onClick={() => onRemoveValue(attr, val)}
                    className="text-[#9A9A9A] hover:text-red-500"
                  >
                    <X size={12} />
                  </button>
                )}
              </span>
            ))}
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={goToProperties}
        className="text-sm text-action hover:underline"
      >
        Adicionar variações
      </button>
    </div>
  )
}
