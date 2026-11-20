import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlertCircle, Eye, EyeOff, UserPlus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function SignupPage() {
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    password_confirm: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signup(form);
      navigate('/', { replace: true });
    } catch (err) {
      const data = err.response?.data;
      const firstError = data && typeof data === 'object'
        ? Object.values(data).flat().find(Boolean)
        : null;
      setError(firstError || data?.detail || 'Unable to create account.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-6 bg-[hsl(var(--secondary))]/40">
      <div className="w-full max-w-md rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] p-6 shadow-sm animate-slide-up">
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-[hsl(var(--foreground))]">Create your account</h1>
          <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">Join Workly and get started.</p>
        </div>

        {error && (
          <div className="mb-4 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/50 dark:text-red-400">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-sm font-medium">First name</label>
              <input name="first_name" value={form.first_name} onChange={update} required autoComplete="given-name" className="h-10 w-full rounded-lg border border-[hsl(var(--input))] bg-[hsl(var(--background))] px-3 text-sm" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Last name</label>
              <input name="last_name" value={form.last_name} onChange={update} required autoComplete="family-name" className="h-10 w-full rounded-lg border border-[hsl(var(--input))] bg-[hsl(var(--background))] px-3 text-sm" />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">Username</label>
            <input name="username" value={form.username} onChange={update} required autoComplete="username" className="h-10 w-full rounded-lg border border-[hsl(var(--input))] bg-[hsl(var(--background))] px-3 text-sm" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">Email</label>
            <input name="email" type="email" value={form.email} onChange={update} required autoComplete="email" className="h-10 w-full rounded-lg border border-[hsl(var(--input))] bg-[hsl(var(--background))] px-3 text-sm" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">Password</label>
            <div className="relative">
              <input name="password" type={showPassword ? 'text' : 'password'} value={form.password} onChange={update} required autoComplete="new-password" className="h-10 w-full rounded-lg border border-[hsl(var(--input))] bg-[hsl(var(--background))] px-3 pr-10 text-sm" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" tabIndex={-1}>
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">Confirm password</label>
            <input name="password_confirm" type={showPassword ? 'text' : 'password'} value={form.password_confirm} onChange={update} required autoComplete="new-password" className="h-10 w-full rounded-lg border border-[hsl(var(--input))] bg-[hsl(var(--background))] px-3 text-sm" />
          </div>

          <button type="submit" disabled={loading} className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-[hsl(var(--primary))] px-4 text-sm font-medium text-white disabled:opacity-50">
            {loading ? <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" /> : <><UserPlus className="h-4 w-4" />Create account</>}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-[hsl(var(--muted-foreground))]">
          Already have an account? <Link to="/login" className="font-medium text-[hsl(var(--primary))] hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
