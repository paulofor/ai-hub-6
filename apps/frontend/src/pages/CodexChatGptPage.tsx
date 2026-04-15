import { useMemo, useState } from 'react';
import CodexPage from './CodexPage';

const STORAGE_KEY = 'aihub.chatgpt.browser-login';
const CHATGPT_CODEX_URL = 'https://chatgpt.com/codex';

function readStoredLoginFlag() {
  if (typeof window === 'undefined') {
    return false;
  }
  return window.localStorage.getItem(STORAGE_KEY) === 'done';
}

export default function CodexChatGptPage() {
  const [loginCompleted, setLoginCompleted] = useState<boolean>(() => readStoredLoginFlag());
  const [openedBrowser, setOpenedBrowser] = useState(false);

  const subtitle = useMemo(
    () =>
      loginCompleted
        ? 'Login confirmado. Você já pode enviar solicitações no modo Codex (ChatGPT).'
        : 'Faça login no ChatGPT pelo navegador para continuar.',
    [loginCompleted]
  );

  const handleOpenLogin = () => {
    window.open(CHATGPT_CODEX_URL, '_blank', 'noopener,noreferrer');
    setOpenedBrowser(true);
  };

  const confirmLogin = () => {
    window.localStorage.setItem(STORAGE_KEY, 'done');
    setLoginCompleted(true);
  };

  const resetLogin = () => {
    window.localStorage.removeItem(STORAGE_KEY);
    setLoginCompleted(false);
    setOpenedBrowser(false);
  };

  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-indigo-200 bg-indigo-50 p-5 shadow-sm dark:border-indigo-900/60 dark:bg-indigo-950/30">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-indigo-900 dark:text-indigo-100">Codex via ChatGPT</h2>
            <p className="text-sm text-indigo-800/90 dark:text-indigo-200/90">{subtitle}</p>
            <p className="text-xs text-indigo-800/80 dark:text-indigo-300/80">
              O login acontece no chatgpt.com em uma nova aba, depois você retorna para o AI Hub.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleOpenLogin}
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-500"
            >
              Fazer login no navegador
            </button>
            <button
              type="button"
              onClick={confirmLogin}
              className="rounded-md border border-indigo-300 bg-white px-3 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-100 dark:border-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-200 dark:hover:bg-indigo-900/60"
            >
              Já fiz login
            </button>
            {loginCompleted && (
              <button
                type="button"
                onClick={resetLogin}
                className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Trocar conta
              </button>
            )}
          </div>
        </div>
        {!loginCompleted && !openedBrowser && (
          <p className="mt-4 text-sm text-indigo-900 dark:text-indigo-100">
            Dica: mantenha esta tela aberta, conclua o login na nova aba e depois clique em <strong>Já fiz login</strong>.
          </p>
        )}
      </section>

      {loginCompleted ? (
        <CodexPage initialProfile="ECO_30" />
      ) : (
        <section className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-300">
          Após confirmar o login, a tela de solicitações do Codex aparece aqui com o perfil <strong>ECO-100</strong> já selecionado.
        </section>
      )}
    </div>
  );
}
