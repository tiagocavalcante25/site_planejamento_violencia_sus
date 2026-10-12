/**
 * app.js - Motor Dinâmico do Portal de Planejamento Reprodutivo, Violência, Bioética & SUS
 * Recursos: Dark/Light Mode, Font-Size Acessível, Busca em Tempo Real, 
 * 3 Calculadoras Clínicas, 15 Casos Interativos USMLE, Flashcards e Modal Viewer.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Inicialização de Ícones Lucide
  if (window.lucide) {
    lucide.createIcons();
  }

  initTheme();
  initFontSize();
  initGlobalSearch();
  initClinicalTools();
  initClinicalCases();
  initFlashcards();
  initImageViewer();
});

/* ==========================================================================
   1. GERENCIADOR DE TEMA (DARK / LIGHT)
   ========================================================================== */
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle) return;

  themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    if (window.lucide) lucide.createIcons();
  });
}

/* ==========================================================================
   2. GERENCIADOR DE TAMANHO DE FONTE ACESSÍVEL
   ========================================================================== */
function initFontSize() {
  const btnDecrease = document.getElementById('font-decrease');
  const btnReset = document.getElementById('font-reset');
  const btnIncrease = document.getElementById('font-increase');

  const setSize = (size) => {
    document.documentElement.setAttribute('data-font-size', size);
    localStorage.setItem('fontSizePreference', size);
  };

  if (btnDecrease) btnDecrease.addEventListener('click', () => setSize('small'));
  if (btnReset) btnReset.addEventListener('click', () => setSize('medium'));
  if (btnIncrease) btnIncrease.addEventListener('click', () => setSize('large'));
}

/* ==========================================================================
   3. BUSCA GLOBAL EM TEMPO REAL
   ========================================================================== */
function initGlobalSearch() {
  const searchInput = document.getElementById('global-search');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase().trim();
    const modules = document.querySelectorAll('.module-card');
    let visibleCount = 0;

    modules.forEach(mod => {
      const text = mod.innerText.toLowerCase();
      if (!term || text.includes(term)) {
        mod.style.display = 'block';
        visibleCount++;
      } else {
        mod.style.display = 'none';
      }
    });

    const noResults = document.getElementById('no-search-results');
    if (noResults) {
      noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  });

  // Atalho de Teclado Ctrl+K ou Cmd+K
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      searchInput.focus();
    }
  });
}

/* ==========================================================================
   4. CALCULADORAS CLÍNICAS INTERATIVAS
   ========================================================================== */
function initClinicalTools() {
  // Calculadora 1: Critérios MEC (OMS / CDC)
  const mecCondSelect = document.getElementById('calc-mec-cond');
  const mecMetodoSelect = document.getElementById('calc-mec-metodo');
  const mecResult = document.getElementById('calc-mec-result');

  const avaliarMEC = () => {
    if (!mecCondSelect || !mecMetodoSelect || !mecResult) return;
    const cond = mecCondSelect.value;
    const metodo = mecMetodoSelect.value;
    if (!cond || !metodo) return;

    let cat = "MEC 1";
    let cor = "bg-emerald-600";
    let desc = "Método liberado sem qualquer restrição de uso.";

    if (cond === 'enxaqueca_aura') {
      if (metodo === 'combinado') {
        cat = "MEC 4 (PROIBIÇÃO ABSOLUTA)";
        cor = "bg-rose-600";
        desc = "Estrogênio multiplica o risco de AVC isquêmico por vasoespasmo cortical transitório.";
      } else {
        cat = "MEC 1 ou 2 (SEGURO)";
        cor = "bg-emerald-600";
        desc = "Métodos com progestagênio isolado (DIU-LNG, implante) ou não hormonais (DIU cobre) são as opções de primeira linha!";
      }
    } else if (cond === 'tabagismo_35') {
      if (metodo === 'combinado') {
        cat = "MEC 4 (PROIBIÇÃO ABSOLUTA)";
        cor = "bg-rose-600";
        desc = "Se fumar ≥ 15 cigarros/dia aos ≥ 35 anos = MEC 4 (risco de infarto e AVC). Se < 15 cig/dia = MEC 3.";
      } else {
        cat = "MEC 1 (LIBERADO)";
        cor = "bg-emerald-600";
        desc = "Progestagênios isolados e DIU de cobre não aumentam risco arterial e podem ser usados com total segurança.";
      }
    } else if (cond === 'has_grave') {
      if (metodo === 'combinado') {
        cat = "MEC 4 (CONTRAINDICAÇÃO)";
        cor = "bg-rose-600";
        desc = "PAS ≥ 160 ou PAD ≥ 100 mmHg contraindica formalmente estrogênio devido ao risco de AVC hemorrágico.";
      } else {
        cat = "MEC 1 ou 2";
        cor = "bg-emerald-600";
        desc = "LARCs e progestagênios são excelentes e seguros para pacientes hipertensas.";
      }
    } else if (cond === 'tev_previo') {
      if (metodo === 'combinado') {
        cat = "MEC 4 (CONTRAINDICAÇÃO)";
        cor = "bg-rose-600";
        desc = "Histórico de trombose venosa profunda ou TEP contraindica etinilestradiol (aumenta fatores II, VII, VIII, X).";
      } else {
        cat = "MEC 2 (DIU Cobre = MEC 1)";
        cor = "bg-emerald-600";
        desc = "DIU de Cobre é MEC 1; Implante e DIU-LNG são MEC 2 seguros.";
      }
    } else if (cond === 'cancer_mama_atual') {
      if (metodo === 'diu_cobre') {
        cat = "MEC 1 (LIVRE DE HORMÔNIO)";
        cor = "bg-emerald-600";
        desc = "O DIU de Cobre é 100% não hormonal e é a escolha segura para pacientes com câncer de mama ativo!";
      } else {
        cat = "MEC 4 (CONTRAINDICAÇÃO A TODOS OS HORMÔNIOS)";
        cor = "bg-rose-600";
        desc = "⚠️ PEGADINHA: Câncer de mama atual é MEC 4 para QUALQUER hormônio, inclusive implante e DIU de levonorgestrel!";
      }
    } else if (cond === 'pos_parto_recente') {
      if (metodo === 'combinado') {
        cat = "MEC 4 (Pós-parto < 21 dias)";
        cor = "bg-rose-600";
        desc = "Janela puerperal de hipercoagulabilidade máxima. Métodos de progestagênio isolado podem ser iniciados no mesmo dia do parto!";
      } else {
        cat = "MEC 1 (Livre)";
        cor = "bg-emerald-600";
        desc = "Métodos de progestagênio isolado (DIU, implante, desogestrel) não afetam a lactação nem aumentam trombose no pós-parto.";
      }
    }

    mecResult.innerHTML = `
      <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 space-y-2">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold uppercase tracking-wider text-slate-500">Resultado Oficial MEC</span>
          <span class="px-2.5 py-0.5 rounded-full text-xs font-extrabold text-white ${cor}">${cat}</span>
        </div>
        <p class="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">${desc}</p>
      </div>
    `;
  };

  if (mecCondSelect && mecMetodoSelect) {
    mecCondSelect.addEventListener('change', avaliarMEC);
    mecMetodoSelect.addEventListener('change', avaliarMEC);
  }

  // Calculadora 2: Simulador de Contracepção de Emergência
  const btnCalcCE = document.getElementById('btn-calc-ce');
  if (btnCalcCE) {
    btnCalcCE.addEventListener('click', () => {
      const horas = parseInt(document.getElementById('ce-horas').value) || 24;
      const imc = parseFloat(document.getElementById('ce-imc').value) || 22;
      const resDiv = document.getElementById('ce-result');

      let diuMsg = "Altíssima eficácia (> 99,8%). É a opção mais segura e vira método de longa ação por 10 anos.";
      let ulipristalMsg = "Excelente eficácia (~98-99%). Bloqueia o pico de LH mesmo se já tiver iniciado. Aguardar 5 dias para reiniciar pílula regular.";
      let lngMsg = "Eficácia de ~85-89%. Inibe a subida inicial do LH. Reiniciar pílula regular no mesmo dia com preservativo por 7 dias.";

      if (horas > 72 && horas <= 120) {
        lngMsg = "⚠️ JANELA AVANÇADA: O Levonorgestrel perde eficácia progressiva após 72h. Prefira DIU de Cobre ou Ulipristal!";
      } else if (horas > 120) {
        diuMsg = "❌ Prazo de 120h expirado! Procure consulta médica.";
        ulipristalMsg = "❌ Prazo expirado.";
        lngMsg = "❌ Prazo expirado.";
      }

      if (imc > 30) {
        lngMsg += " ⚠️ ALERTA OBESIDADE: O Levonorgestrel tem taxa documentada de falhas em mulheres com IMC > 25-30 kg/m² ou peso > 70 kg.";
        ulipristalMsg += " Mantém boa eficácia em IMC até 35 kg/m².";
        diuMsg += " ✅ Padrão-Ouro absoluto: o DIU de cobre NÃO tem sua eficácia alterada pelo peso corporal!";
      }

      resDiv.innerHTML = `
        <div class="space-y-2 mt-3 text-xs">
          <div class="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
            <span class="font-bold text-emerald-800 dark:text-emerald-300 uppercase">1. DIU de Cobre TCu380A (Janela: até 120h)</span>
            <p class="text-slate-700 dark:text-slate-300 mt-0.5">${diuMsg}</p>
          </div>
          <div class="p-3 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800">
            <span class="font-bold text-sky-800 dark:text-sky-300 uppercase">2. Acetato de Ulipristal 30mg (Janela: até 120h)</span>
            <p class="text-slate-700 dark:text-slate-300 mt-0.5">${ulipristalMsg}</p>
          </div>
          <div class="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
            <span class="font-bold text-amber-800 dark:text-amber-300 uppercase">3. Levonorgestrel 1,5mg (Janela: até 72h)</span>
            <p class="text-slate-700 dark:text-slate-300 mt-0.5">${lngMsg}</p>
          </div>
        </div>
      `;
    });
  }

  // Calculadora 3: Janela de Oportunidade da THM
  const btnCalcTHM = document.getElementById('btn-calc-thm');
  if (btnCalcTHM) {
    btnCalcTHM.addEventListener('click', () => {
      const idade = parseInt(document.getElementById('thm-idade').value) || 52;
      const anosMeno = parseInt(document.getElementById('thm-tempo').value) || 2;
      const utero = document.getElementById('thm-utero').value;
      const comorb = document.getElementById('thm-comorb').value;
      const resDiv = document.getElementById('thm-result');

      let janela = false;
      if (idade < 60 || anosMeno < 10) janela = true;

      let recomendacao = "";
      let via = comorb === 'has_trig' ? "VIA TRANSDÉRMICA (GEL OU ADESIVO) OBRIGATÓRIA" : "Via Transdérmica ou Oral";
      let protUtero = utero === 'com_utero' ? "OBRIGATÓRIO associar PROGESTERONA natural micronizada para proteger o endométrio!" : "Mulher histerectomizada: usa ESTROGÊNIO ISOLADO (dispensa progesterona).";

      if (janela) {
        recomendacao = `
          <div class="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200">
            <div class="flex items-center gap-1.5 font-bold uppercase text-xs mb-1">
              <i data-lucide="check-circle" class="w-4 h-4"></i> DENTRO DA JANELA DE OPORTUNIDADE (Benefício Líquido Favorável)
            </div>
            <p class="text-xs sm:text-sm">A paciente possui < 60 anos ou < 10 anos de menopausa. Apresenta alívio potente dos fogachos, proteção da massa óssea e redução da mortalidade global.</p>
            <div class="mt-2.5 pt-2.5 border-t border-emerald-200 dark:border-emerald-800/60 text-xs space-y-1">
              <p><strong>Via Indicada:</strong> ${via} (pula a passagem hepática e não altera triglicerídeos/trombose).</p>
              <p><strong>Proteção Endometrial:</strong> ${protUtero}</p>
            </div>
          </div>
        `;
      } else {
        recomendacao = `
          <div class="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200">
            <div class="flex items-center gap-1.5 font-bold uppercase text-xs mb-1">
              <i data-lucide="alert-triangle" class="w-4 h-4"></i> FORA DA JANELA DE OPORTUNIDADE (Risco Supera Benefícios)
            </div>
            <p class="text-xs sm:text-sm">Iniciar THM sistêmica em mulheres com ≥ 60 anos ou com > 10 anos de menopausa desestabiliza placas ateroscleróticas e aumenta risco de AVC, IAM e demência!</p>
            <p class="mt-2 text-xs font-semibold">Opção de Escolha: Alternativas Não Hormonais (Venlafaxina, Desvenlafaxina, Gabapentina ou Fezolinetant).</p>
          </div>
        `;
      }

      resDiv.innerHTML = recomendacao;
      if (window.lucide) lucide.createIcons();
    });
  }
}

/* ==========================================================================
   5. CENTRAL DE CASOS CLÍNICOS (15 CASOS USMLE INTERATIVOS - PARTE 8)
   ========================================================================== */
const CASOS_PARTE8 = [
  {
    id: 1,
    title: "Caso 1: Contracepção em Paciente com Enxaqueca com Aura",
    enunciado: "Mulher de 26 anos comparece à consulta ginecológica para solicitar método contraceptivo. Refere vida sexual ativa com parceiro estável há 6 meses e não deseja engravidar nos próximos anos. Seu histórico médico é notável por episódios recorrentes de cefaleia hemicraniana pulsátil intensa, acompanhada de náuseas e fotofobia, que ocorrem 1 a 2 vezes ao mês. Antes do início da dor de cabeça, ela rotineiramente observa linhas luminosas em zigue-zague e pontos cintilantes no campo visual que duram cerca de 25 minutos. Ao exame físico: PA = 118/74 mmHg, IMC = 22 kg/m², exame ginecológico normal. Qual das seguintes opções é CONTRAINDICADA (MEC Categoria 4)?",
    options: [
      { id: 'A', text: "Dispositivo intrauterino com levonorgestrel (52 mg)" },
      { id: 'B', text: "Implante subdérmico de etonogestrel" },
      { id: 'C', text: "Anticoncepcional oral combinado contendo etinilestradiol e drospirenona", correct: true },
      { id: 'D', text: "Dispositivo intrauterino de cobre TCu380A" },
      { id: 'E', text: "Injeção intramuscular de acetato de medroxiprogesterona de depósito" }
    ],
    explicacaoIvy: "A enxaqueca com aura em qualquer faixa etária é classificada como MEC Categoria 4 (Contraindicação Absoluta) para todos os contraceptivos combinados com estrogênio. O estrogênio induz alterações nos fatores de coagulação que, somados ao vasoespasmo cortical transitório da aura, multiplicam significativamente o risco de Acidente Vascular Cerebral Isquêmico (AVCi). Métodos de progestagênio isolado (DIU-LNG, implante) ou não hormonais (DIU de cobre) são seguros (MEC 1 ou 2) e constituem as opções de escolha.",
    analogia5Anos: "Essa moça tem uma dor de cabeça especial que solta 'luzinhas brilhantes' nos olhos (enxaqueca com aura). Se ela tomar remédio com estrogênio, os caninhos da cabeça podem dar um nó e entupir (derraminho). Então o médico proíbe qualquer remédio com estrogênio para proteger a cabecinha dela!"
  },
  {
    id: 2,
    title: "Caso 2: Manejo Imediato de Violência Sexual Aguda",
    enunciado: "Mulher de 21 anos é trazida ao pronto-socorro relatando ter sido vítima de estupro coletivo há 14 horas, envolvendo penetração vaginal e oral sem preservativo. O teste de gravidez na urina é negativo e o teste rápido para HIV no leito é não reagente. Seu cartão vacinal comprova 3 doses da vacina contra hepatite B na infância. Qual das seguintes condutas profiláticas imediatas é a MAIS adequada?",
    options: [
      { id: 'A', text: "Administrar apenas levonorgestrel e azitromicina, aguardando boletim de ocorrência para prescrever PEP para HIV" },
      { id: 'B', text: "Prescrever Tenofovir + Lamivudina + Dolutegravir por 28 dias, Ceftriaxona IM, Azitromicina VO, Metronidazol VO e Levonorgestrel VO", correct: true },
      { id: 'C', text: "Indicar esquema de PEP para HIV por 7 dias associado a imunoglobulina humana anti-hepatite B (HBIG)" },
      { id: 'D', text: "Realizar curetagem uterina profilática imediata e solicitar sorologias em 30 dias" },
      { id: 'E', text: "Iniciar terapia antirretroviral contendo Zidovudina por 14 dias e encaminhar para a delegacia antes de qualquer medicação" }
    ],
    explicacaoIvy: "Atendimento à violência sexual com menos de 72 horas exige abordagem profilática integrada imediata: (1) PEP para HIV com Tenofovir + Lamivudina + Dolutegravir por 28 dias; (2) Contracepção de emergência com Levonorgestrel 1,5mg VO em dose única; (3) Profilaxia de ISTs não virais com Ceftriaxona 500mg IM + Azitromicina 1g VO + Metronidazol 2g VO. Como a paciente tem esquema completo comprovado contra hepatite B, não necessita de imunoglobulina HBIG. O atendimento à saúde NUNCA deve ser adiado por trâmites policiais!",
    analogia5Anos: "Quando alguém passa por uma maldade dessas, o médico tem um pacotinho de remédios mágicos de emergência: um remédio para o vírus do HIV não entrar (toma por 28 dias), remédios para matar bactérias ruins e um remédio de emergência para não engravidar. E o médico nunca espera a polícia para cuidar da saúde da pessoa!"
  },
  {
    id: 3,
    title: "Caso 3: Solicitação de Aborto Legal por Violência Sexual",
    enunciado: "Mulher de 19 anos comparece à maternidade pública relatando gravidez de 9 semanas resultante de estupro. Ela não registrou queixa na delegacia por medo e não possui boletim de ocorrência nem laudo do IML. A ultrassonografia confirma embrião viável de 9 semanas. Ela solicita expressamente a interrupção da gestação permitida por lei. Qual é a conduta correta?",
    options: [
      { id: 'A', text: "Negar o procedimento até que a paciente apresente alvará/autorização judicial emitido por juiz" },
      { id: 'B', text: "Exigir a apresentação de cópia do boletim de ocorrência registrado em delegacia de polícia" },
      { id: 'C', text: "Encaminhar a paciente compulsoriamente ao IML para exame de corpo de delito" },
      { id: 'D', text: "Acolher a paciente pela equipe multiprofissional, colher o relato circunstanciado e termos de consentimento, e proceder à interrupção da gestação", correct: true },
      { id: 'E', text: "Recusar a assistência por falta de provas materiais da violência e denunciar o fato ao Ministério Público" }
    ],
    explicacaoIvy: "No Brasil, o abortamento em gestação decorrente de estupro é expressamente permitido pelo Art. 128, II, do Código Penal. Pelas diretrizes do Ministério da Saúde e resoluções do CFM, NÃO É EXIGIDO Boletim de Ocorrência (B.O.), autorização judicial ou laudo do IML. A palavra da mulher tem presunção legal de veracidade. A equipe multiprofissional acolhe a paciente, colhe o Termo de Consentimento Livre e Esclarecido (TCLE) e Termo de Relato Circunstanciado, e realiza a interrupção.",
    analogia5Anos: "Se uma moça sofreu uma violência e engravidou por causa disso, a lei diz que o hospital tem que acolher e cuidar dela. Ela NÃO é obrigada a ir na delegacia, nem falar com o juiz, nem provar nada com papéis da polícia para receber o tratamento. Os médicos acreditam no relato dela e a ajudam com segurança!"
  },
  {
    id: 4,
    title: "Caso 4: Investigação de Infertilidade Conjugal com Fator Masculino",
    enunciado: "Casal procura consulta médica após 14 meses de tentativas frustradas. A esposa tem 28 anos, ciclos regulares de 28 dias, HSG com trompas pérvias e Cotte positivo. O primeiro espermograma do marido de 30 anos apresentou: Volume = 2,0 mL, Concentração = 6 milhões/mL (ref ≥ 16), Motilidade progressiva = 18% (ref ≥ 30%) e Morfologia estrita de Kruger = 2% normais (ref ≥ 4%). Qual é a conduta diagnóstica imediata?",
    options: [
      { id: 'A', text: "Indicar imediatamente fertilização in vitro com ICSI sem novos testes" },
      { id: 'B', text: "Solicitar biópsia testicular aberta bilateral de urgência" },
      { id: 'C', text: "Repetir o espermograma completo após um intervalo de 4 a 12 semanas", correct: true },
      { id: 'D', text: "Iniciar reposição empírica de testosterona intramuscular para estimular a espermatogênese" },
      { id: 'E', text: "Prescrever clomifeno para o homem e programar coito assistido no próximo ciclo" }
    ],
    explicacaoIvy: "Regra de Ouro do USMLE e da Andrologia: Os parâmetros seminais apresentam flutuações fisiológicas acentuadas secundárias a estresse, infecções recentes ou variações térmicas escrotais no ciclo de espermatogênese de ~74 dias. Um diagnóstico de oligoastenoteratozoospermia NUNCA deve ser firmado com base em um único exame! A diretriz da ASRM e da OMS determina que um segundo espermograma deve ser realizado após 4 a 12 semanas antes de qualquer intervenção definitiva.",
    analogia5Anos: "O exame da sementinha do papai veio alterado, mas o corpo do homem pode mudar de um mês para o outro por cansaço ou resfriado. Antes de dar qualquer remédio ou fazer cirurgia, nós sempre repetimos o exame depois de algumas semanas para confirmar se a sementinha continua nadando devagar!"
  },
  {
    id: 5,
    title: "Caso 5: Contracepção de Emergência em Paciente Obesa no 4º Dia Pós-Coito",
    enunciado: "Mulher de 31 anos procura a UBS no 4º dia (aproximadamente 90 horas) após relação desprotegida por rompimento de preservativo. Nega comorbidades, porém apresenta obesidade grau II (IMC = 36,6 kg/m²). Qual método de emergência apresenta a MAIOR taxa de eficácia disponível para o seu caso?",
    options: [
      { id: 'A', text: "Levonorgestrel oral em dose única de 1,5 mg" },
      { id: 'B', text: "Pílulas combinadas orais em esquema de Yuzpe" },
      { id: 'C', text: "Inserção de Dispositivo Intrauterino de Cobre (DIU TCu380A)", correct: true },
      { id: 'D', text: "Injeção intramuscular de acetato de medroxiprogesterona de depósito" },
      { id: 'E', text: "Iniciar anel vaginal contendo etinilestradiol e etonogestrel" }
    ],
    explicacaoIvy: "O DIU de Cobre (TCu380A) é o método mais eficaz de contracepção de emergência existente, com taxa de falha inferior a 0,1% quando inserido em até 5 dias (120 horas) após a relação. Crucialmente, sua eficácia NÃO é reduzida pelo IMC ou pelo peso da paciente! Em contraste, o Levonorgestrel oral perde eficácia após 72 horas e apresenta taxas elevadas de falha em mulheres com IMC > 25-30 kg/m².",
    analogia5Anos: "Se já se passaram 4 dias da relação e a paciente está com o pesinho mais alto, os remedinhos normais de engolir já não funcionam tão bem. O método mais poderoso do mundo inteiro é colocar a estrelinha de cobre (o DIU) dentro do útero: funciona perfeitamente até 5 dias depois, não se importa com o peso e ainda protege por 10 anos!"
  },
  {
    id: 6,
    title: "Caso 6: Bioética e Sigilo Médico em Adolescente Solicitando Anticoncepção",
    enunciado: "Adolescente de 15 anos comparece desacompanhada solicitando início de pílula anticoncepcional. Relata início recente de vida sexual com namorado de 16 anos. Demonstra maturidade, compreensão dos riscos e benefícios e nega coerção. Pede segredo absoluto aos pais por medo de punições. Qual é a conduta ética correta?",
    options: [
      { id: 'A', text: "Recusar o atendimento e exigir a presença dos pais para consentimento" },
      { id: 'B', text: "Acolher a paciente, realizar o aconselhamento contraceptivo, prescrever o método e manter o sigilo médico sem avisar os pais", correct: true },
      { id: 'C', text: "Prescrever o método, porém notificar os pais por telefone ao término da consulta" },
      { id: 'D', text: "Acionar imediatamente o Conselho Tutelar e a Polícia Civil por crime sexual" },
      { id: 'E', text: "Prescrever apenas preservativos, pois menores de 18 anos são proibidas de usar hormônios" }
    ],
    explicacaoIvy: "Tanto o Código de Ética Médica brasileiro (CFM Parecer 25/2013) quanto a American Academy of Pediatrics (AAP) estabelecem que o adolescente com discernimento tem capacidade de consentir com cuidados relativos à sua própria saúde sexual e reprodutiva. O sigilo médico é inviolável, sendo vedada a comunicação aos pais contra a vontade da paciente. Como o parceiro tem 16 anos, não há que se falar em estupro de vulnerável (idade ≥ 14 anos).",
    analogia5Anos: "Meninas adolescentes que já entendem tudo direitinho têm o direito de conversar com o médico com total segredo sobre prevenção. O médico ajuda a paciente a se proteger e guarda o segredinho médico com carinho, porque quebrar a confiança afastaria ela do hospital!"
  },
  {
    id: 7,
    title: "Caso 7: THM em Paciente com Hipertrigliceridemia e Útero Íntegro",
    enunciado: "Mulher de 51 anos, menopausa há 18 meses, com queixa de fogachos intensos (12 a 15 episódios/dia) e insônia debilitante. Útero íntegro ao ultrassom. Nega histórico pessoal ou familiar de trombose ou neoplasias. Exames laboratoriais: Colesterol LDL = 110 mg/dL e Triglicerídeos elevados = 340 mg/dL (ref < 150). Qual é o esquema de THM de ESCOLHA?",
    options: [
      { id: 'A', text: "Estrogênios conjugados equinos orais isolados" },
      { id: 'B', text: "17β-Estradiol em gel transdérmico associado a progesterona micronizada oral", correct: true },
      { id: 'C', text: "Valerato de estradiol oral associado a acetato de ciproterona oral" },
      { id: 'D', text: "Tibolona oral em monoterapia de alta dosagem" },
      { id: 'E', text: "Contraindicação absoluta a qualquer forma de reposição hormonal" }
    ],
    explicacaoIvy: "A paciente está dentro da Janela de Oportunidade (51 anos, menopausa há < 10 anos). O estrogênio oral passa pela circulação portal hepática e estimula a síntese de triglicerídeos e fatores pró-trombóticos, o que agravaria a hipertrigliceridemia. O estrogênio transdérmico (gel ou adesivo) pula o fígado, mantendo os triglicerídeos neutros! Por possuir útero íntegro, é OBRIGATÓRIO associar progestagênio (progesterona natural micronizada) para proteger o endométrio contra hiperplasia e câncer.",
    analogia5Anos: "Essa paciente tem o útero guardadinho e gordurinhas (triglicerídeos) um pouco altas no sangue. Se ela tomar remédio engolido, o fígado fabrica mais gordura! O médico passa o estrogênio na pele como creminho/gel (que pula o fígado) e dá a progesterona natural para proteger a portinha do útero!"
  },
  {
    id: 8,
    title: "Caso 8: Suspeita de Violência Doméstica com Lesões Incompatíveis",
    enunciado: "Mulher de 34 anos comparece à UPA com dor torácica e no braço após uma 'queda no banheiro'. O marido ao seu lado insiste em falar pelo casal e descreve o acidente enquanto ela fica calada e evita contato visual. Ao exame físico: equimoses no dorso, hematoma na mandíbula e escoriações no antebraço esquerdo compatíveis com lesões de defesa. Radiografia revela fratura recente do 7º e 8º arcos costais. Qual é a PRIMEIRA conduta correta?",
    options: [
      { id: 'A', text: "Confrontar diretamente o marido na sala e acusá-lo de agressão" },
      { id: 'B', text: "Solicitar que o marido aguarde na recepção e realizar a avaliação da paciente a sós em ambiente privativo", correct: true },
      { id: 'C', text: "Dar alta com analgésicos e acionar imediatamente a viatura da polícia militar" },
      { id: 'D', text: "Solicitar termo assinado pelo casal atestando que a lesão ocorreu acidentalmente" },
      { id: 'E', text: "Orientar a paciente na frente do acompanhante a ligar para o 180" }
    ],
    explicacaoIvy: "Diante de lesões incompatíveis com o relato (fraturas costais, hematoma facial, lesões de defesa) e acompanhante controlador, o médico deve separar o parceiro com cortesia protocolar e entrevistar a paciente a sós em ambiente privativo. Somente sem a presença intimidadora do agressor a mulher poderá revelar a verdade com segurança, permitindo o acolhimento, atendimento médico das lesões e elaboração de um plano de segurança. Confrontar o agressor na sala pode desencadear escalada letal de violência!",
    analogia5Anos: "Quando o médico desconfia que a paciente foi machucada em casa, ele precisa conversar com ela em um quartinho bem seguro e a sós, sem o marido na sala. Assim ela se sente protegida para contar a verdade e receber ajuda de verdade!"
  },
  {
    id: 9,
    title: "Caso 9: Sangramento Irregular Pós-Implante de Etonogestrel",
    enunciado: "Mulher de 22 anos comparece 4 meses após inserção de implante subdérmico de etonogestrel (Implanon) relatando sangramento vaginal amarronzado em pequena quantidade (spotting) imprevisível a cada 3 a 5 dias. Nega cólicas intensas ou febre. Teste de gravidez negativo e implante facilmente palpável no braço esquerdo. Qual é a fisiopatologia e a conduta recomendada?",
    options: [
      { id: 'A', text: "O implante perdeu eficácia e deve ser removido imediatamente" },
      { id: 'B', text: "Trata-se de atrofia endometrial com fragilidade capilar superficial; conduta envolve orientar a benignidade e curso curto de AINE", correct: true },
      { id: 'C', text: "Perfuração uterina subclínica; solicitar histeroscopia de urgência" },
      { id: 'D', text: "Efeito hiperestrogênico; prescrever inibidor de aromatase" },
      { id: 'E', text: "Doença inflamatória pélvica aguda; prescrever ceftriaxona e doxiciclina" }
    ],
    explicacaoIvy: "O sangramento imprevisível (spotting) é o efeito colateral mais frequente dos contraceptivos contendo apenas progestagênio contínuo (implante). Decorre da atrofia endometrial acentuada com vasodilatação capilar e fragilidade dos vasos superficiais. A eficácia do método permanece altíssima (> 99,95%). A abordagem envolve tranquilizar a paciente sobre a ausência de gravidez e benignidade; se incômodo, um curso de 5 a 7 dias de AINEs (Ibuprofeno) ou curso curto de estrogênio pode estabilizar o endométrio temporariamente.",
    analogia5Anos: "O implante é uma varinha mágica que deixa o forrinho da casinha tão fininho e sequinho que de vez em quando um vasinho minúsculo solta uma gotinha de sangue marrom. Isso é normal, o método está funcionando com perfeição máxima (melhor que laqueadura!) e um anti-inflamatório ajuda a parar de pingar!"
  },
  {
    id: 10,
    title: "Caso 10: Rastreamento e Manejo da Osteoporose com Bifosfonatos",
    enunciado: "Mulher de 66 anos, assintomática, na menopausa desde os 50 anos, realiza densitometria óssea computadorizada (DEXA) de rotina. Resultado: T-score em coluna lombar = -2,8 desvios-padrão e colo de fêmur = -2,6 desvios-padrão. Creatinina e cálcio séricos normais. Qual é o diagnóstico e o tratamento de primeira linha?",
    options: [
      { id: 'A', text: "Osteopenia; indicar apenas aumento de laticínios na dieta" },
      { id: 'B', text: "Osteoporose; prescrever Alendronato de sódio 70 mg oral semanal, cálcio e vitamina D", correct: true },
      { id: 'C', text: "Osteoporose grave; prescrever Teriparatida subcutânea e calcitonina" },
      { id: 'D', text: "Osteopenia; iniciar Terapia Hormonal da Menopausa com estrogênio oral" },
      { id: 'E', text: "Normalidade densitométrica; repetir exame em 10 anos" }
    ],
    explicacaoIvy: "Pela classificação da OMS/NOF, T-score ≤ -2,5 estabelece diagnóstico de Osteoporose. O rastreamento universal com DEXA é indicado a partir dos 65 anos. O tratamento farmacológico de primeira linha são os bifosfonatos orais (Alendronato 70 mg/semana), associados a aporte de cálcio e vitamina D. Instruções imperativas: tomar em jejum pela manhã com água pura e permanecer em pé ou sentado por 30 a 60 minutos para evitar esofagite química e úlcera esofágica!",
    analogia5Anos: "Os ossinhos dessa senhora ficaram um pouco 'furadinhos e frágeis' por dentro (osteoporose). O melhor remédio é o alendronato uma vez por semana, tomado em jejum com água bem limpinha e ficando sentadinha ou em pé por meia hora para o remédio não arranhar a gargantinha!"
  },
  {
    id: 11,
    title: "Caso 11: Anovulação por SOP e Indução da Ovulação com Letrozol",
    enunciado: "Mulher de 27 anos, casada há 2 anos, relata infertilidade há 18 meses. Menstrua 3 a 4 vezes ao ano desde a menarca. IMC = 31,5 kg/m², acne facial e hirsutismo moderado. USG transvaginal mostra ovários de 13 cm³ com múltiplos folículos periféricos. O espermograma do parceiro é perfeitamente normal e as trompas são pérvias bilateralmente na HSG. Qual é o medicamento de PRIMEIRA LINHA recomendado para indução da ovulação visando à gravidez?",
    options: [
      { id: 'A', text: "Citrato de Clomifeno" },
      { id: 'B', text: "Letrozol", correct: true },
      { id: 'C', text: "Metformina em monoterapia" },
      { id: 'D', text: "Gonadotrofinas injetáveis de alta dosagem" },
      { id: 'E', text: "Acetato de Ciproterona com Etinilestradiol" }
    ],
    explicacaoIvy: "Conforme o ensaio clínico clássico PPCOS II e diretrizes da ESHRE/ASRM, o Letrozol (inibidor da aromatase) é a primeira linha absoluta para indução da ovulação em mulheres anovulatórias com SOP. Ele apresenta taxas superiores de ovulação e de nascidos vivos em comparação ao clássico Clomifeno, além de menor incidência de gestação múltipla e menor efeito antiestrogênico desfavorável sobre o endométrio.",
    analogia5Anos: "O jardim dessa moça está um pouco preguiçoso para soltar florzinhas (ovular) por causa dos ovários policísticos. O melhor remédio para acordar o ovário com carinho e fazer nascer um bebezinho de cada vez é o Letrozol!"
  },
  {
    id: 12,
    title: "Caso 12: Limites da Objeção de Consciência em Emergência Obstétrica",
    enunciado: "Em hospital do interior, jovem de 20 anos chega em choque hipovolêmico grave (PA = 70/40 mmHg, FC = 135 bpm, sangramento uterino ativo profuso) após abortamento incompleto clandestino. O médico plantonista é o único médico presente no serviço. Ele alega objeção de consciência contra o abortamento e se recusa a realizar esvaziamento uterino (AMIU) ou dar uterotônicos, determinando transferência em ambulância para hospital a 100 km. Qual a análise da conduta?",
    options: [
      { id: 'A', text: "O médico agiu dentro dos seus plenos direitos de liberdade moral e religiosa" },
      { id: 'B', text: "A conduta é antiética e criminosa; a objeção de consciência é categoricamente PROIBIDA em situações de urgência/emergência ou na ausência de outro médico no serviço", correct: true },
      { id: 'C', text: "O médico agiu corretamente, pois a lei o autoriza a transferir casos que firam sua moral" },
      { id: 'D', text: "O médico deveria ter aguardado autorização judicial prévia antes da transferência" },
      { id: 'E', text: "A conduta é ética se o médico administrou soro fisiológico antes de transferir" }
    ],
    explicacaoIvy: "O Código de Ética Médica e as diretrizes bioéticas internacionais são categóricos: A objeção de consciência NUNCA pode ser alegada em situações de urgência ou emergência médica (risco de morte materna) ou quando NÃO houver outro médico no serviço capaz de prestar o atendimento imediato. A recusa em tratar choque hipovolêmico após abortamento configura omissão de socorro e infração ética gravíssima.",
    analogia5Anos: "Nenhum médico no mundo pode cruzar os braços e deixar uma pessoa sangrando e correndo risco de vida por causa da sua religião ou opinião pessoal! Quando alguém está em perigo grave, o médico tem a obrigação de salvar a vida imediatamente!"
  },
  {
    id: 13,
    title: "Caso 13: Manejo da Síndrome Geniturinária da Menopausa (GSM)",
    enunciado: "Mulher de 58 anos, menopausa há 8 anos, procura atendimento com queixa de secura vaginal severa, queimação constante no introito e dispareunia excruciante, sem queixas de fogachos. Já tentou lubrificantes e hidratantes com ácido hialurônico por 4 meses sem melhora. Ao exame: mucosa vaginal pálida, adelgaçada, sem rugosidades. Útero íntegro. Qual é a conduta farmacológica MAIS apropriada?",
    options: [
      { id: 'A', text: "Iniciar terapia hormonal sistêmica oral combinada com estradiol e medroxiprogesterona" },
      { id: 'B', text: "Prescrever Estrogênio Tópico Vaginal de baixa dose (creme de estriol ou promestrieno), sem necessidade de progesterona associada", correct: true },
      { id: 'C', text: "Prescrever progesterona oral contínua isolada" },
      { id: 'D', text: "Indicar histerectomia total para alívio dos sintomas genitais" },
      { id: 'E', text: "Recomendar duchas vaginais diárias antissépticas" }
    ],
    explicacaoIvy: "Para sintomas isolados de atrofia urogenital (GSM) refratários a hidratantes, o Estrogênio Vaginal Tópico em baixa dose (estriol ou promestrieno) é o tratamento padrão-ouro. Como a absorção sistêmica dessas microdoses é mínima e desprezível, NÃO há proliferação do endométrio; portanto, NÃO É NECESSÁRIO associar progestagênio sistêmico, mesmo em mulheres com útero íntegro!",
    analogia5Anos: "Essa senhora está com a pelezinha da entrada da casinha muito seca e doendo porque está faltando uma gotinha de estrogênio bem ali naquele lugarzinho. Ela não precisa tomar comprimido no corpo todo! Uma pomadinha com dose bem pequenininha aplicada direto no local restaura a pele, acaba com a dor e não absorve para o corpo, então ela nem precisa de remédio para proteger o útero!"
  },
  {
    id: 14,
    title: "Caso 14: Nova Legislação de Laqueadura Tubária no Brasil (Lei 14.443/2022)",
    enunciado: "Mulher de 22 anos, casada civilmente, com 1 filho vivo (G1P1), comparece à UBS manifestando expressamente o desejo de realizar laqueadura tubária bilateral. O marido encontra-se em viagem a trabalho e não pôde comparecer para assinar nenhum termo. De acordo com a Lei Federal nº 14.443/2022 (em vigor desde 2023), qual é a orientação jurídica e médica correta?",
    options: [
      { id: 'A', text: "A laqueadura não pode ser autorizada porque a idade mínima permanece em 25 anos" },
      { id: 'B', text: "A laqueadura só pode ser realizada se ela tiver pelo menos 3 filhos vivos" },
      { id: 'C', text: "O procedimento não pode ser agendado sem a assinatura do marido autorizando a cirurgia" },
      { id: 'D', text: "A paciente preenche os requisitos legais (idade ≥ 21 anos) e a exigência de consentimento do cônjuge foi expressamente revogada pela nova lei", correct: true },
      { id: 'E', text: "A paciente é obrigada a usar o DIU de cobre por 2 anos antes de pleitear a laqueadura" }
    ],
    explicacaoIvy: "A Lei 14.443/2022 reduziu a idade mínima para esterilização voluntária no Brasil para 21 anos (OU ter pelo menos dois filhos vivos) e REVOGOU expressamente a obrigatoriedade de autorização do cônjuge/parceiro! A decisão reprodutiva é um direito personalíssimo e exclusivo da mulher (ou do homem na vasectomia). Mantém-se o prazo de reflexão de 60 dias entre a assinatura do termo e o procedimento.",
    analogia5Anos: "A lei brasileira agora diz com clareza: a mulher com 21 anos é dona do seu próprio corpinho e decide sobre a cirurgia sem precisar pedir permissão para o marido!"
  },
  {
    id: 15,
    title: "Caso 15: Investigação de Fio do DIU Não Visível ao Exame Especular",
    enunciado: "Mulher de 28 anos comparece para revisão de rotina do DIU com levonorgestrel (Mirena) inserido há 1 ano. Está assintomática e em amenorreia. Ao exame especular com visualização adequada da ectocérvice, os fios do DIU não são visíveis no orifício cervical externo. Tração suave com pinça delicada no canal não expõe os fios. Qual é a conduta diagnóstica imediata?",
    options: [
      { id: 'A', text: "Realizar curetagem uterina de urgência no centro cirúrgico" },
      { id: 'B', text: "Solicitar teste de gravidez (β-hCG) e realizar Ultrassonografia Pélvica Transvaginal", correct: true },
      { id: 'C', text: "Encaminhar para laparotomia exploradora imediata por certeza de perfuração" },
      { id: 'D', text: "Assegurar que o dispositivo foi certamente expelido e inserir um novo DIU na hora" },
      { id: 'E', text: "Solicitar ressonância magnética com contraste da pelve como exame inicial" }
    ],
    explicacaoIvy: "Quando os fios do DIU não são visíveis (missing IUD strings), as hipóteses são: retração dos fios para o canal/útero, expulsão não percebida ou perfuração uterina. A conduta imediata mandatória é excluir gestação (β-hCG) e solicitar Ultrassonografia Transvaginal. A USG confirma se o DIU está adequadamente centrado na cavidade endometrial. Se a USG não visualizar o DIU no útero, realiza-se Radiografia de Abdome/Pelve para pesquisar migração peritoneal.",
    analogia5Anos: "Se os fios da estrelinha mágica sumiram da portinha da casinha, nós não vamos cutucar no escuro com pinça de ferro! Primeiro fazemos um teste de gravidez e tiramos uma 'fotinho de ultrassom' da barriguinha para ver se ela apenas puxou os fiozinhos para dentro ou se caiu no vaso sem a mamãe ver!"
  }
];

let casosRespondidos8 = 0;
let casosAcertos8 = 0;

function initClinicalCases() {
  const container = document.getElementById('casos-clinicos-container');
  if (!container) return;

  container.innerHTML = CASOS_PARTE8.map(caso => `
    <div class="glass-card p-5 sm:p-6 mb-6 transition-all" id="caso-card-${caso.id}">
      <div class="flex items-center justify-between gap-2 mb-3">
        <span class="px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300">
          Caso Clínico ${caso.id} de 15
        </span>
        <span class="text-xs text-slate-400 font-mono">USMLE Step 2/3 • Revalida</span>
      </div>

      <h3 class="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-3">${caso.title}</h3>
      <p class="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">${caso.enunciado}</p>

      <div class="space-y-2 mb-4">
        ${caso.options.map(opt => `
          <button type="button" 
            class="caso-opt-btn w-full text-left p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-sky-400 dark:hover:border-sky-500 bg-white/80 dark:bg-slate-800/80 hover:bg-sky-50/50 dark:hover:bg-sky-950/20 text-xs sm:text-sm text-slate-800 dark:text-slate-200 transition-all flex items-start gap-2.5"
            data-caso="${caso.id}" data-opt="${opt.id}" data-correct="${opt.correct ? 'true' : 'false'}">
            <span class="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center font-bold text-xs flex-shrink-0 text-slate-700 dark:text-slate-300">${opt.id}</span>
            <span class="flex-1">${opt.text}</span>
          </button>
        `).join('')}
      </div>

      <!-- Feedback Oculto Inicialmente -->
      <div id="caso-feedback-${caso.id}" class="hidden space-y-3 pt-4 border-t border-slate-200 dark:border-slate-700">
        <div id="caso-status-${caso.id}" class="p-3 rounded-xl font-bold text-xs sm:text-sm"></div>

        <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
          <h4 class="text-xs font-extrabold uppercase tracking-wider text-sky-600 dark:text-sky-400 mb-1.5 flex items-center gap-1.5">
            <i data-lucide="award" class="w-4 h-4"></i> Raciocínio Fisiopatológico Ivy League / USMLE
          </h4>
          <p class="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">${caso.explicacaoIvy}</p>
        </div>

        <div class="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900">
          <h4 class="text-xs font-extrabold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-1.5 flex items-center gap-1.5">
            🎈 Didática para Criança de 5 Anos
          </h4>
          <p class="text-xs sm:text-sm text-amber-900 dark:text-amber-200 leading-relaxed">${caso.analogia5Anos}</p>
        </div>
      </div>
    </div>
  `).join('');

  if (window.lucide) lucide.createIcons();

  // Listener para Opções
  document.querySelectorAll('.caso-opt-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const casoId = this.dataset.caso;
      const card = document.getElementById(`caso-card-${casoId}`);
      if (card.dataset.answered === 'true') return;

      card.dataset.answered = 'true';
      const isCorrect = this.dataset.correct === 'true';

      casosRespondidos8++;
      if (isCorrect) casosAcertos8++;
      updateScoreboard8();

      const buttons = card.querySelectorAll('.caso-opt-btn');
      buttons.forEach(b => {
        b.disabled = true;
        b.classList.add('cursor-default');
        if (b.dataset.correct === 'true') {
          b.classList.remove('border-slate-200', 'dark:border-slate-700');
          b.classList.add('border-emerald-500', 'bg-emerald-50', 'dark:bg-emerald-950/40', 'text-emerald-900', 'dark:text-emerald-200');
        } else if (b === this && !isCorrect) {
          b.classList.remove('border-slate-200', 'dark:border-slate-700');
          b.classList.add('border-rose-500', 'bg-rose-50', 'dark:bg-rose-950/40', 'text-rose-900', 'dark:text-rose-200');
        }
      });

      const feedback = document.getElementById(`caso-feedback-${casoId}`);
      const statusBox = document.getElementById(`caso-status-${casoId}`);
      feedback.classList.remove('hidden');

      if (isCorrect) {
        statusBox.className = "p-3 rounded-xl font-bold text-xs sm:text-sm bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800";
        statusBox.innerHTML = "✅ Resposta Correta! Excelente raciocínio clínico.";
      } else {
        statusBox.className = "p-3 rounded-xl font-bold text-xs sm:text-sm bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-800";
        statusBox.innerHTML = "❌ Resposta Incorreta. Revise as diretrizes e a fundamentação abaixo:";
      }

      if (window.lucide) lucide.createIcons();
    });
  });
}

function updateScoreboard8() {
  const elRespondidos = document.getElementById('score-respondidos');
  const elAcertos = document.getElementById('score-acertos');
  const elPct = document.getElementById('score-pct');

  if (elRespondidos) elRespondidos.innerText = casosRespondidos8;
  if (elAcertos) elAcertos.innerText = casosAcertos8;
  if (elPct) {
    const pct = casosRespondidos8 > 0 ? Math.round((casosAcertos8 / casosRespondidos8) * 100) : 0;
    elPct.innerText = `${pct}%`;
  }
}

/* ==========================================================================
   6. FLASHCARDS INTERATIVOS (PARTE 8)
   ========================================================================== */
const FLASHCARDS_PARTE8 = [
  { q: "Qual a novidade da Lei 14.443/2022 sobre laqueadura no Brasil?", a: "Reduziu a idade mínima para 21 anos (ou pelo menos 2 filhos vivos) e REVOGOU a exigência de consentimento do cônjuge/parceiro! Além disso, permite laqueadura durante o parto com termo assinado 60 dias antes." },
  { q: "Por que a enxaqueca com aura contraindica anticoncepcional combinado?", a: "Porque o estrogênio associado ao vasoespasmo cortical transitório da aura multiplica drasticamente o risco de Acidente Vascular Cerebral Isquêmico (AVCi) (MEC 4)." },
  { q: "Qual o método de contracepção de emergência mais eficaz do mundo?", a: "O DIU de Cobre (TCu380A) inserido em até 5 dias (120h) pós-coito (> 99,8% de eficácia). Não perde eficácia com sobrepeso ou obesidade." },
  { q: "Quais as 3 hipóteses de aborto não punível no Brasil?", a: "1. Aborto terapêutico/necessário (salvar a vida da gestante)\n2. Aborto humanitário (gravidez resultante de estupro)\n3. Anencefalia fetal (STF - ADPF 54 / 2012)." },
  { q: "É exigido B.O. ou autorização judicial para aborto por estupro?", a: "NÃO! A lei e as normas do Ministério da Saúde NÃO exigem boletim de ocorrência, autorização judicial nem laudo do IML. A palavra da mulher tem presunção de veracidade." },
  { q: "Qual a 'Regra do Útero' na Terapia Hormonal da Menopausa (THM)?", a: "Mulher COM ÚTERO: OBRIGATÓRIO associar PROGESTERONA ao estrogênio para proteger o endométrio.\nMulher SEM ÚTERO (histerectomizada): usa ESTROGÊNIO ISOLADO." },
  { q: "Quando a via transdérmica de estrogênio é mandatória na THM?", a: "Em mulheres hipertensas, obesas, com hipertrigliceridemia ou tabagistas, pois a via transdérmica pula o fígado e não altera os fatores de coagulação nem os triglicerídeos." },
  { q: "Qual a regra ética sobre a Objeção de Consciência Médica?", a: "O médico pode recusar procedimentos que firam sua consciência, EXCETO em urgência/emergência com risco de morte ou quando não houver outro médico no serviço para atender!" }
];

let currentCardIdx8 = 0;

function initFlashcards() {
  const cardContainer = document.getElementById('flashcard-container');
  const btnPrev = document.getElementById('card-prev');
  const btnNext = document.getElementById('card-next');
  const cardCounter = document.getElementById('card-counter');

  if (!cardContainer) return;

  const renderCard = () => {
    const card = FLASHCARDS_PARTE8[currentCardIdx8];
    cardContainer.classList.remove('flipped');
    cardContainer.innerHTML = `
      <div class="flashcard-inner relative w-full min-h-[180px] sm:min-h-[220px] rounded-2xl cursor-pointer p-6 flex flex-col justify-between shadow-md">
        <div class="flashcard-front absolute inset-0 rounded-2xl bg-gradient-to-br from-sky-500 via-indigo-600 to-purple-600 text-white p-6 flex flex-col justify-between">
          <div class="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-sky-100">
            <span>Pergunta High-Yield</span>
            <span class="flex items-center gap-1"><i data-lucide="rotate-cw" class="w-3.5 h-3.5"></i> Toque para virar</span>
          </div>
          <p class="text-base sm:text-xl font-bold my-auto text-center">${card.q}</p>
          <div class="text-[11px] text-center text-sky-200">Clique no card para revelar a resposta oficial</div>
        </div>

        <div class="flashcard-back absolute inset-0 rounded-2xl bg-slate-900 border border-slate-700 text-white p-6 flex flex-col justify-between">
          <div class="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-emerald-400">
            <span>Resposta Padrão USMLE</span>
            <span class="flex items-center gap-1"><i data-lucide="check" class="w-3.5 h-3.5"></i> Revisado</span>
          </div>
          <p class="text-xs sm:text-sm font-medium my-auto text-slate-200 leading-relaxed whitespace-pre-line text-left">${card.a}</p>
          <div class="text-[11px] text-center text-slate-400">Toque para desvirar</div>
        </div>
      </div>
    `;

    if (cardCounter) cardCounter.innerText = `${currentCardIdx8 + 1} de ${FLASHCARDS_PARTE8.length}`;
    if (window.lucide) lucide.createIcons();

    cardContainer.onclick = () => cardContainer.classList.toggle('flipped');
  };

  if (btnPrev) {
    btnPrev.addEventListener('click', () => {
      currentCardIdx8 = (currentCardIdx8 - 1 + FLASHCARDS_PARTE8.length) % FLASHCARDS_PARTE8.length;
      renderCard();
    });
  }

  if (btnNext) {
    btnNext.addEventListener('click', () => {
      currentCardIdx8 = (currentCardIdx8 + 1) % FLASHCARDS_PARTE8.length;
      renderCard();
    });
  }

  renderCard();
}

/* ==========================================================================
   7. MODAL DE VISUALIZAÇÃO DE IMAGENS EM ALTA RESOLUÇÃO
   ========================================================================== */
function initImageViewer() {
  const modal = document.getElementById('image-modal');
  const modalImg = document.getElementById('modal-img');
  const modalCaption = document.getElementById('modal-caption');
  const modalClose = document.getElementById('modal-close');

  if (!modal || !modalImg) return;

  document.querySelectorAll('.img-zoom-hover').forEach(img => {
    img.addEventListener('click', function() {
      modalImg.src = this.src;
      modalCaption.innerText = this.getAttribute('alt') || 'Imagem de Alta Definição';
      modal.classList.remove('hidden');
    });
  });

  const closeModal = () => modal.classList.add('hidden');

  if (modalClose) modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.id === 'modal-backdrop') closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
  });
}
