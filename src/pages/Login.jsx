import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { Button } from '../components/ui/Button'
import { config } from '../config'
 
export default function Login() {
  const { login } = useAuth()
  const [form, setForm] = useState({
    siteUrl: config.siteUrl,
    username: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
 
  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
 
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.siteUrl || !form.username || !form.password) return
    setLoading(true)
    try {
      await login(form)
    } finally {
      setLoading(false)
    }
  }
 
  return (
    <div className="min-h-screen bg-[#0D0D0D] flex flex-col items-center justify-between p-6">
      <div className="flex-1 w-full max-w-sm flex flex-col justify-center">
        {/* Logo do cliente */}
        <div className="flex flex-col items-center mb-8">
          <img
            src={config.logos.full}
            alt={config.clientName}
            className="h-20 w-auto object-contain"
            onError={(e) => {
              e.target.style.display = 'none'
              e.target.nextSibling.style.display = 'flex'
            }}
          />
          <div
            style={{ display: 'none' }}
            className="w-16 h-16 rounded-2xl bg-primary items-center justify-center"
          >
            <span className="text-[#141414] text-2xl font-bold">{config.logos.fallbackLetter}</span>
          </div>
        </div>
 
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* URL do site */}
          <div className="flex flex-col gap-1">
            <label className="text-[13px] font-medium text-[#C4C4C4]">URL do site</label>
            <input
              type="url"
              name="siteUrl"
              value={form.siteUrl}
              onChange={handleChange}
              placeholder={config.siteUrl}
              required
              className="w-full h-12 px-4 text-sm bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-[#9A9A9A]"
            />
          </div>
 
          {/* Usuário */}
          <div className="flex flex-col gap-1">
            <label className="text-[13px] font-medium text-[#C4C4C4]">Usuário do WordPress</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="admin"
              required
              autoComplete="username"
              className="w-full h-12 px-4 text-sm bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-[#9A9A9A]"
            />
          </div>
 
          {/* Application Password */}
          <div className="flex flex-col gap-1">
            <label className="text-[13px] font-medium text-[#C4C4C4]">Application Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="xxxx xxxx xxxx xxxx"
                required
                autoComplete="current-password"
                className="w-full h-12 px-4 pr-12 text-sm bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-[#9A9A9A]"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9A9A9A] hover:text-[#C4C4C4]"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
 
          <Button
            type="submit"
            fullWidth
            size="lg"
            loading={loading}
            className="mt-2"
          >
            Entrar
          </Button>
        </form>
      </div>
 
      {/* Rodapé: Desenvolvido por FK Digital */}
      <div className="w-full flex flex-col items-center gap-2 pt-6">
        <p className="text-xs text-[#9A9A9A]">Desenvolvido por:</p>
        <img
          src="/logo%20azul%20escuro.png"
          alt="FK Digital"
          className="h-10 w-auto object-contain opacity-70 brightness-0 invert"
          onError={(e) => { e.target.style.display = 'none' }}
        />
      </div>
    </div>
  )
}
