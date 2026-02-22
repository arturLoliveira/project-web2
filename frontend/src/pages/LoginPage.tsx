import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { loginService } from "@/services/users";

export default function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const user = await loginService(email);

        if (user) {
            if (user.password === password) {
                if (user.type !== "ADMIN") {
                    setError("Acesso negado. Apenas administradores podem entrar.");
                    return;
                }
                login(user);
                navigate("/admin");
            } else {
                setError("Senha incorreta.");
            }
        } else {
            setError("Usuário não encontrado.");
        }
    };

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .login-root {
          min-height: 100vh;
          display: flex;
          background: #0a0a0f;
          font-family: 'DM Sans', sans-serif;
          overflow: hidden;
          position: relative;
        }

        .login-panel-left {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          padding: 60px;
        }

        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.18;
          pointer-events: none;
        }
        .orb-1 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, #c8a97e, transparent);
          top: -100px; left: -150px;
          animation: drift 12s ease-in-out infinite alternate;
        }
        .orb-2 {
          width: 350px; height: 350px;
          background: radial-gradient(circle, #7e9cc8, transparent);
          bottom: -80px; right: -80px;
          animation: drift 16s ease-in-out infinite alternate-reverse;
        }
        @keyframes drift {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(30px, 20px) scale(1.05); }
        }

        .left-content { position: relative; z-index: 2; max-width: 420px; }

        .brand-tag {
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #c8a97e;
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .brand-tag::before {
          content: '';
          display: block;
          width: 32px;
          height: 1px;
          background: #c8a97e;
        }

        .left-heading {
          font-family: 'Playfair Display', serif;
          font-size: clamp(42px, 5vw, 64px);
          font-weight: 700;
          color: #f0ece4;
          line-height: 1.1;
          margin-bottom: 24px;
        }
        .left-heading em { font-style: italic; color: #c8a97e; }

        .left-desc {
          font-size: 15px;
          color: #6b6b7a;
          line-height: 1.7;
          font-weight: 300;
        }

        .divider-line {
          width: 1px;
          background: linear-gradient(to bottom, transparent, #2a2a35, transparent);
          align-self: stretch;
          margin: 40px 0;
        }

        .login-panel-right {
          width: 480px;
          min-height: 100vh;
          background: #111118;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px 50px;
          border-left: 1px solid #1e1e28;
          position: relative;
        }

        .lock-icon-bg {
          position: absolute;
          top: 40px;
          right: 50px;
          opacity: 0.06;
          pointer-events: none;
        }

        .form-wrapper {
          width: 100%;
          max-width: 360px;
          animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .form-eyebrow {
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #3a3a48;
          margin-bottom: 32px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .form-eyebrow::after {
          content: '';
          flex: 1;
          height: 1px;
          background: #1e1e28;
        }

        .form-title {
          font-family: 'Playfair Display', serif;
          font-size: 28px;
          font-weight: 400;
          color: #f0ece4;
          margin-bottom: 8px;
        }

        .form-subtitle {
          font-size: 13px;
          color: #44444f;
          margin-bottom: 40px;
          font-weight: 300;
        }

        .field-group { margin-bottom: 24px; }

        .field-label {
          display: block;
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #5a5a6a;
          margin-bottom: 8px;
          font-weight: 500;
        }

        .field-input {
          width: 100%;
          background: #0d0d14;
          border: 1px solid #1e1e2e;
          border-radius: 6px;
          padding: 14px 16px;
          color: #f0ece4;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 300;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .field-input::placeholder { color: #2e2e3e; }
        .field-input:focus {
          border-color: #c8a97e;
          box-shadow: 0 0 0 3px rgba(200, 169, 126, 0.08);
        }

        .error-msg {
          font-size: 12px;
          color: #e07575;
          margin-bottom: 20px;
          padding: 10px 14px;
          background: rgba(224, 117, 117, 0.07);
          border: 1px solid rgba(224, 117, 117, 0.15);
          border-radius: 5px;
        }

        .submit-btn {
          width: 100%;
          padding: 15px;
          background: #c8a97e;
          border: none;
          border-radius: 6px;
          color: #0a0a0f;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.2s, transform 0.1s;
        }
        .submit-btn:hover { background: #d9bc96; }
        .submit-btn:active { transform: scale(0.99); }

        .form-footer {
          margin-top: 32px;
          padding-top: 24px;
          border-top: 1px solid #1a1a24;
          font-size: 11px;
          color: #33333e;
          text-align: center;
          line-height: 1.6;
          font-weight: 300;
        }

        @media (max-width: 860px) {
          .login-panel-left { display: none; }
          .divider-line { display: none; }
          .login-panel-right { width: 100%; border: none; }
        }
      `}</style>

            <div className="login-root">
                {/* Left Panel */}
                <div className="login-panel-left">
                    <div className="orb orb-1" />
                    <div className="orb orb-2" />
                    <div className="left-content">
                        <p className="brand-tag">Painel Administrativo</p>
                        <h1 className="left-heading">
                            Controle <em>total</em> na palma da mão.
                        </h1>
                        <p className="left-desc">
                            Gerencie eventos, usuários e configurações com acesso exclusivo a administradores autorizados.
                        </p>
                    </div>
                </div>

                <div className="divider-line" />

                {/* Right Panel */}
                <div className="login-panel-right">
                    <svg className="lock-icon-bg" width="140" height="140" viewBox="0 0 24 24" fill="none" stroke="#c8a97e" strokeWidth="1.2">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>

                    <div className="form-wrapper">
                        <p className="form-eyebrow">Acesso restrito</p>
                        <h2 className="form-title">Bem-vindo de volta</h2>
                        <p className="form-subtitle">Insira suas credenciais para continuar</p>

                        <form onSubmit={handleLogin}>
                            <div className="field-group">
                                <label htmlFor="email" className="field-label">Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    className="field-input"
                                    placeholder="admin@exemplo.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="field-group">
                                <label htmlFor="password" className="field-label">Senha</label>
                                <input
                                    id="password"
                                    type="password"
                                    className="field-input"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            {error && <p className="error-msg">{error}</p>}

                            <button type="submit" className="submit-btn">
                                Entrar
                            </button>
                        </form>

                        <p className="form-footer">
                            Esse é um sistema privado. Caso não tenha acesso,<br />
                            contate o administrador.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
