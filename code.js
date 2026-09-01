<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CodeLab — Playground</title>
  <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
  <style>
    :root {
      --accent: #00ffcc;
      --accent-rgb: 0, 255, 204;
      --bg: #050510;
      --bg2: #0a0a1a;
      --bg3: #0f0f22;
      --border: rgba(0, 255, 204, 0.2);
      --text: #e0e0e0;
      --muted: rgba(255,255,255,0.4);
    }

    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      background: var(--bg);
      color: var(--text);
      font-family: 'Inter', sans-serif;
      height: 100vh;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    /* TOPBAR */
    .topbar {
      height: 52px;
      background: var(--bg2);
      border-bottom: 1px solid var(--border);
      display: flex; align-items: center;
      padding: 0 16px; gap: 12px;
      flex-shrink: 0;
    }

    .logo {
      font-family: 'Fira Code', monospace;
      font-size: 15px; font-weight: 600;
      color: var(--accent);
      text-shadow: 0 0 15px rgba(var(--accent-rgb), 0.5);
      margin-right: 8px;
    }

    .lang-tabs {
      display: flex; gap: 4px;
    }

    .lang-tab {
      padding: 5px 14px;
      border-radius: 6px;
      border: 1px solid rgba(var(--accent-rgb), 0.2);
      background: transparent;
      color: var(--muted);
      font-family: 'Fira Code', monospace;
      font-size: 12px; font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
    }
    .lang-tab:hover { color: var(--accent); border-color: rgba(var(--accent-rgb), 0.4); }
    .lang-tab.active {
      background: rgba(var(--accent-rgb), 0.15);
      border-color: var(--accent);
      color: var(--accent);
    }

    .topbar-actions {
      margin-left: auto;
      display: flex; gap: 8px;
    }

    .btn-run {
      background: rgba(var(--accent-rgb), 0.15);
      border: 1px solid var(--accent);
      border-radius: 8px; padding: 7px 20px;
      color: var(--accent); font-family: 'Fira Code', monospace;
      font-size: 13px; font-weight: 600;
      cursor: pointer; transition: all 0.2s;
    }
    .btn-run:hover {
      background: rgba(var(--accent-rgb), 0.3);
      box-shadow: 0 0 15px rgba(var(--accent-rgb), 0.3);
    }

    .btn-clear {
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.15);
      border-radius: 8px; padding: 7px 14px;
      color: var(--muted); font-size: 13px;
      cursor: pointer; transition: all 0.2s;
    }
    .btn-clear:hover { background: rgba(255,50,50,0.15); border-color: #ff4444; color: #ff6666; }

    /* MAIN LAYOUT */
    .main {
      flex: 1;
      display: flex;
      overflow: hidden;
    }

    /* EDITOR SIDE */
    .editor-side {
      flex: 1;
      display: flex;
      flex-direction: column;
      border-right: 1px solid var(--border);
      min-width: 0;
    }

    /* HTML/CSS/JS tabs */
    .sub-tabs {
      display: flex;
      border-bottom: 1px solid var(--border);
      background: var(--bg2);
      flex-shrink: 0;
    }

    .sub-tab {
      padding: 8px 20px;
      font-family: 'Fira Code', monospace;
      font-size: 12px; color: var(--muted);
      cursor: pointer; border-bottom: 2px solid transparent;
      transition: all 0.2s;
    }
    .sub-tab:hover { color: var(--text); }
    .sub-tab.active { color: var(--accent); border-bottom-color: var(--accent); }

    .editor-panels {
      flex: 1;
      position: relative;
      overflow: hidden;
    }

    .editor-panel {
      position: absolute; inset: 0;
      display: none;
    }
    .editor-panel.active { display: flex; flex-direction: column; }

    .editor-label {
      padding: 6px 14px;
      font-family: 'Fira Code', monospace;
      font-size: 10px; color: var(--muted);
      background: var(--bg3);
      border-bottom: 1px solid rgba(var(--accent-rgb), 0.1);
      letter-spacing: 1px;
      flex-shrink: 0;
    }

    textarea {
      flex: 1;
      background: var(--bg);
      border: none; outline: none;
      color: var(--text);
      font-family: 'Fira Code', monospace;
      font-size: 13px;
      line-height: 1.7;
      padding: 16px;
      resize: none;
      tab-size: 2;
    }
    textarea::placeholder { color: rgba(255,255,255,0.15); }

    /* OUTPUT SIDE */
    .output-side {
      width: 45%;
      display: flex;
      flex-direction: column;
      min-width: 300px;
      flex-shrink: 0;
    }

    .output-header {
      height: 37px;
      background: var(--bg2);
      border-bottom: 1px solid var(--border);
      display: flex; align-items: center;
      padding: 0 14px; gap: 8px;
      flex-shrink: 0;
    }

    .output-dot {
      width: 8px; height: 8px;
      border-radius: 50%;
      background: var(--accent);
      box-shadow: 0 0 8px var(--accent);
      animation: pulse 1.5s infinite;
    }
    @keyframes pulse {
      0%,100% { opacity: 0.6; transform: scale(0.9); }
      50% { opacity: 1; transform: scale(1.2); }
    }

    .output-title {
      font-family: 'Fira Code', monospace;
      font-size: 11px; color: var(--muted);
      letter-spacing: 1px;
    }

    .output-panels {
      flex: 1;
      position: relative;
      overflow: hidden;
    }

    /* PREVIEW iframe */
    #preview-frame {
      position: absolute; inset: 0;
      width: 100%; height: 100%;
      border: none;
      background: #fff;
      display: none;
    }
    #preview-frame.active { display: block; }

    /* CONSOLE output */
    #console-output {
      position: absolute; inset: 0;
      overflow-y: auto;
      padding: 14px;
      font-family: 'Fira Code', monospace;
      font-size: 12px; line-height: 1.8;
      display: none;
    }
    #console-output.active { display: block; }

    .console-line {
      padding: 2px 0;
      border-bottom: 1px solid rgba(255,255,255,0.04);
    }
    .console-line.output { color: #e0e0e0; }
    .console-line.error { color: #ff6b6b; }
    .console-line.info { color: rgba(var(--accent-rgb), 0.8); }
    .console-line.warn { color: #f59e0b; }

    .console-prompt {
      color: var(--accent); margin-right: 8px;
    }

    /* STATUS BAR */
    .statusbar {
      height: 24px;
      background: rgba(var(--accent-rgb), 0.08);
      border-top: 1px solid var(--border);
      display: flex; align-items: center;
      padding: 0 14px; gap: 16px;
      flex-shrink: 0;
    }

    .status-item {
      font-family: 'Fira Code', monospace;
      font-size: 10px; color: var(--muted);
      letter-spacing: 0.5px;
    }
    .status-item span { color: var(--accent); }

    /* LOADING */
    .loading-overlay {
      position: absolute; inset: 0;
      background: rgba(5,5,16,0.85);
      display: none; align-items: center; justify-content: center;
      flex-direction: column; gap: 12px;
      z-index: 10;
    }
    .loading-overlay.show { display: flex; }
    .loading-spinner {
      width: 32px; height: 32px;
      border: 2px solid rgba(var(--accent-rgb), 0.2);
      border-top-color: var(--accent);
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    .loading-text {
      font-family: 'Fira Code', monospace;
      font-size: 12px; color: var(--accent);
    }

    /* RESIZE HANDLE */
    .resize-handle {
      width: 4px;
      background: var(--border);
      cursor: col-resize;
      transition: background 0.2s;
      flex-shrink: 0;
    }
    .resize-handle:hover { background: var(--accent); }

    /* SCROLLBAR */
    ::-webkit-scrollbar { width: 4px; height: 4px; }
    ::-webkit-scrollbar-track { background: var(--bg); }
    ::-webkit-scrollbar-thumb { background: rgba(var(--accent-rgb), 0.3); border-radius: 2px; }

    /* PYTHON/C NOTE */
    .api-note {
      padding: 20px;
      font-family: 'Fira Code', monospace;
      font-size: 12px; color: var(--muted);
      line-height: 1.8;
    }
    .api-note .highlight { color: var(--accent); }
  </style>
</head>
<body>

  <!-- TOPBAR -->
  <div class="topbar">
    <div class="logo">⚡ CodeLab</div>
    <div class="lang-tabs">
      <button class="lang-tab active" onclick="switchLang('web')">🌐 HTML/CSS/JS</button>
      <button class="lang-tab" onclick="switchLang('python')">🐍 Python</button>
      <button class="lang-tab" onclick="switchLang('c')">⚙️ C / C++</button>
    </div>
    <div class="topbar-actions">
      <button class="btn-clear" onclick="clearAll()">🗑 Clear</button>
      <button class="btn-run" onclick="runCode()">▶ Run</button>
    </div>
  </div>

  <!-- MAIN -->
  <div class="main" id="main">

    <!-- EDITOR -->
    <div class="editor-side" id="editor-side">

      <!-- Sub tabs (HTML/CSS/JS only) -->
      <div class="sub-tabs" id="web-subtabs">
        <div class="sub-tab active" onclick="switchSubTab('html')">HTML</div>
        <div class="sub-tab" onclick="switchSubTab('css')">CSS</div>
        <div class="sub-tab" onclick="switchSubTab('js')">JavaScript</div>
      </div>

      <div class="editor-panels">

        <!-- WEB panels -->
        <div class="editor-panel active" id="panel-html">
          <div class="editor-label">// HTML</div>
          <textarea id="code-html" placeholder="<!-- HTML của mày vô đây -->
<!DOCTYPE html>
<html>
<body>
  <h1>Hello World!</h1>
</body>
</html>"></textarea>
        </div>

        <div class="editor-panel" id="panel-css">
          <div class="editor-label">// CSS</div>
          <textarea id="code-css" placeholder="/* CSS vô đây */
body {
  background: #0a0a14;
  color: #00ffcc;
  font-family: monospace;
}"></textarea>
        </div>

        <div class="editor-panel" id="panel-js">
          <div class="editor-label">// JavaScript</div>
          <textarea id="code-js" placeholder="// JS vô đây
console.log('Hello from CodeLab! 🔥');"></textarea>
        </div>

        <!-- PYTHON panel -->
        <div class="editor-panel" id="panel-python">
          <div class="editor-label">// Python</div>
          <textarea id="code-python" placeholder="# Python vô đây
print('Hello World!')

for i in range(5):
    print(f'Line {i+1}: 🔥')"></textarea>
        </div>

        <!-- C/C++ panel -->
        <div class="editor-panel" id="panel-c">
          <div class="editor-label">// C / C++</div>
          <textarea id="code-c" placeholder="#include <stdio.h>

int main() {
    printf(&quot;Hello World!\n&quot;);
    return 0;
}"></textarea>
        </div>

      </div>
    </div>

    <!-- RESIZE -->
    <div class="resize-handle" id="resize-handle"></div>

    <!-- OUTPUT -->
    <div class="output-side" id="output-side">
      <div class="output-header">
        <div class="output-dot"></div>
        <div class="output-title">OUTPUT</div>
        <div style="margin-left:auto;font-family:'Fira Code',monospace;font-size:10px;color:var(--muted)" id="run-time"></div>
      </div>
      <div class="output-panels" style="position:relative;">

        <!-- Loading -->
        <div class="loading-overlay" id="loading">
          <div class="loading-spinner"></div>
          <div class="loading-text" id="loading-text">Đang chạy...</div>
        </div>

        <!-- Preview iframe (HTML/CSS/JS) -->
        <iframe id="preview-frame" sandbox="allow-scripts"></iframe>

        <!-- Console (Python/C) -->
        <div id="console-output"></div>

      </div>
    </div>

  </div>

  <!-- STATUS BAR -->
  <div class="statusbar">
    <div class="status-item">Lang: <span id="status-lang">HTML/CSS/JS</span></div>
    <div class="status-item">Lines: <span id="status-lines">0</span></div>
    <div class="status-item">Chars: <span id="status-chars">0</span></div>
    <div class="status-item" id="status-msg">Ready ✓</div>
  </div>

  <script>
    let currentLang = 'web';
    let currentSubTab = 'html';

    // SWITCH LANGUAGE
    function switchLang(lang) {
      currentLang = lang;
      document.querySelectorAll('.lang-tab').forEach((t,i) => {
        t.classList.toggle('active', ['web','python','c'][i] === lang);
      });

      const webTabs = document.getElementById('web-subtabs');
      webTabs.style.display = lang === 'web' ? 'flex' : 'none';

      // Hide all panels
      document.querySelectorAll('.editor-panel').forEach(p => p.classList.remove('active'));

      if (lang === 'web') {
        document.getElementById('panel-' + currentSubTab).classList.add('active');
        document.getElementById('status-lang').textContent = 'HTML/CSS/JS';
      } else if (lang === 'python') {
        document.getElementById('panel-python').classList.add('active');
        document.getElementById('status-lang').textContent = 'Python';
      } else if (lang === 'c') {
        document.getElementById('panel-c').classList.add('active');
        document.getElementById('status-lang').textContent = 'C / C++';
      }

      updateStatusBar();
      clearOutput();
    }

    // SWITCH SUB TAB
    function switchSubTab(tab) {
      currentSubTab = tab;
      document.querySelectorAll('.sub-tab').forEach((t,i) => {
        t.classList.toggle('active', ['html','css','js'][i] === tab);
      });
      document.querySelectorAll('.editor-panel').forEach(p => p.classList.remove('active'));
      document.getElementById('panel-' + tab).classList.add('active');
      updateStatusBar();
    }

    // RUN CODE
    function runCode() {
      const start = performance.now();
      showLoading(true);

      setTimeout(() => {
        if (currentLang === 'web') runWeb();
        else if (currentLang === 'python') runPython();
        else if (currentLang === 'c') runC();

        const ms = (performance.now() - start).toFixed(1);
        document.getElementById('run-time').textContent = `${ms}ms`;
        showLoading(false);
      }, 300);
    }

    // RUN WEB
    function runWeb() {
      const html = document.getElementById('code-html').value;
      const css = document.getElementById('code-css').value;
      const js = document.getElementById('code-js').value;

      const full = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>${css}</style>
</head>
<body>
${html}
<script>
try {
  // Override console
  const _log = console.log;
  ${js}
} catch(e) {
  document.body.innerHTML += '<div style="color:#ff6b6b;font-family:monospace;padding:10px">❌ ' + e.message + '</div>';
}
<\/script>
</body>
</html>`;

      const frame = document.getElementById('preview-frame');
      frame.classList.add('active');
      document.getElementById('console-output').classList.remove('active');
      frame.srcdoc = full;
      setStatus('Web preview loaded ✓');
    }

    // RUN PYTHON (via Piston API)
    async function runPython() {
      const code = document.getElementById('code-python').value;
      if (!code.trim()) { showConsole([{type:'warn', text:'Code trống rỗng brody 😭'}]); return; }

      showLoading(true, 'Đang chạy Python...');
      try {
        const res = await fetch('https://emkc.org/api/v2/piston/execute', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            language: 'python',
            version: '3.10.0',
            files: [{ content: code }]
          })
        });
        const data = await res.json();
        const output = data.run?.output || '';
        const stderr = data.run?.stderr || '';

        const lines = [];
        if (output) output.split('\n').filter(Boolean).forEach(l => lines.push({type:'output', text: l}));
        if (stderr) stderr.split('\n').filter(Boolean).forEach(l => lines.push({type:'error', text: l}));
        if (!lines.length) lines.push({type:'info', text:'(Không có output)'});

        showConsole(lines);
        setStatus('Python executed ✓');
      } catch(e) {
        showConsole([{type:'error', text:'❌ Lỗi kết nối API — kiểm tra internet brody'}]);
      }
      showLoading(false);
    }

    // RUN C/C++ (via Piston API)
    async function runC() {
      const code = document.getElementById('code-c').value;
      if (!code.trim()) { showConsole([{type:'warn', text:'Code trống rỗng brody 😭'}]); return; }

      const isCpp = code.includes('cout') || code.includes('iostream') || code.includes('string') || code.includes('vector');
      const lang = isCpp ? 'c++' : 'c';
      const ver = isCpp ? '10.2.0' : '10.2.0';

      showLoading(true, `Đang compile ${isCpp ? 'C++' : 'C'}...`);
      try {
        const res = await fetch('https://emkc.org/api/v2/piston/execute', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            language: lang,
            version: ver,
            files: [{ content: code }]
          })
        });
        const data = await res.json();
        const output = data.run?.output || data.compile?.output || '';
        const stderr = (data.run?.stderr || '') + (data.compile?.stderr || '');

        const lines = [];
        if (output) output.split('\n').filter(Boolean).forEach(l => lines.push({type:'output', text: l}));
        if (stderr) stderr.split('\n').filter(Boolean).forEach(l => lines.push({type:'error', text: l}));
        if (!lines.length) lines.push({type:'info', text:'(Không có output)'});

        showConsole(lines);
        setStatus(`${isCpp ? 'C++' : 'C'} executed ✓`);
      } catch(e) {
        showConsole([{type:'error', text:'❌ Lỗi kết nối API — kiểm tra internet brody'}]);
      }
      showLoading(false);
    }

    // SHOW CONSOLE
    function showConsole(lines) {
      const frame = document.getElementById('preview-frame');
      const cons = document.getElementById('console-output');
      frame.classList.remove('active');
      cons.classList.add('active');

      cons.innerHTML = lines.map(l => `
        <div class="console-line ${l.type}">
          <span class="console-prompt">${l.type === 'error' ? '✗' : l.type === 'warn' ? '⚠' : '>'}</span>${escapeHtml(l.text)}
        </div>
      `).join('');
    }

    function escapeHtml(str) {
      return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    }

    function clearOutput() {
      document.getElementById('preview-frame').classList.remove('active');
      document.getElementById('console-output').classList.remove('active');
      document.getElementById('console-output').innerHTML = '';
    }

    function clearAll() {
      document.getElementById('code-html').value = '';
      document.getElementById('code-css').value = '';
      document.getElementById('code-js').value = '';
      document.getElementById('code-python').value = '';
      document.getElementById('code-c').value = '';
      clearOutput();
      setStatus('Cleared ✓');
      updateStatusBar();
    }

    function showLoading(show, text = 'Đang chạy...') {
      const el = document.getElementById('loading');
      document.getElementById('loading-text').textContent = text;
      el.classList.toggle('show', show);
    }

    function setStatus(msg) {
      document.getElementById('status-msg').textContent = msg;
    }

    // STATUS BAR update
    function updateStatusBar() {
      const activeTA = document.querySelector('.editor-panel.active textarea');
      if (activeTA) {
        const val = activeTA.value;
        document.getElementById('status-lines').textContent = val.split('\n').length;
        document.getElementById('status-chars').textContent = val.length;
      }
    }

    document.querySelectorAll('textarea').forEach(ta => {
      ta.addEventListener('input', updateStatusBar);
      ta.addEventListener('keydown', e => {
        if (e.key === 'Tab') {
          e.preventDefault();
          const s = ta.selectionStart;
          ta.value = ta.value.substring(0,s) + '  ' + ta.value.substring(ta.selectionEnd);
          ta.selectionStart = ta.selectionEnd = s + 2;
          updateStatusBar();
        }
        // Ctrl+Enter = Run
        if (e.ctrlKey && e.key === 'Enter') runCode();
      });
    });

    // RESIZE
    const handle = document.getElementById('resize-handle');
    let isResizing = false;
    handle.addEventListener('mousedown', () => isResizing = true);
    document.addEventListener('mousemove', e => {
      if (!isResizing) return;
      const main = document.getElementById('main');
      const rect = main.getBoundingClientRect();
      const editorW = e.clientX - rect.left;
      const totalW = rect.width;
      const pct = Math.min(75, Math.max(25, (editorW / totalW) * 100));
      document.getElementById('editor-side').style.flex = 'none';
      document.getElementById('editor-side').style.width = pct + '%';
      document.getElementById('output-side').style.width = (100 - pct - 0.3) + '%';
    });
    document.addEventListener('mouseup', () => isResizing = false);

    // DEFAULT CODE
    document.getElementById('code-html').value = `<h1 style="color:#00ffcc;font-family:monospace">Hello CodeLab! ⚡</h1>
<p style="color:#aaa">Edit code rồi bấm ▶ Run hoặc Ctrl+Enter</p>`;

    updateStatusBar();
  </script>
</body>
</html>
