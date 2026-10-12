# 🏥 Portal Interativo de Obstetrícia e Ginecologia — Parte 8
## Planejamento Reprodutivo & Saúde Sexual · Violência contra a Mulher, Bioética & Legislação · Ginecologia e Obstetrícia no SUS & Atenção Integral

Site estático, responsivo e interativo baseado no **Guia Completo de Obstetrícia e Ginecologia Parte 8**, projetado para estudo de alto desempenho para **USMLE Step 2 CK / Step 3**, **Revalida**, exames de **Residência Médica (SUS/ENARE/USP)** e prática clínica ambulatorial.

---

## 🚀 Como Fazer o Deploy no GitHub Pages

Este projeto foi construído com arquitetura estática (HTML5 + Tailwind CSS CDN + JavaScript Vanilla), dispensando etapas de compilação (*zero build steps*) e sendo 100% compatível com o GitHub Pages.

### Opção 1: Deploy Direto via Git (Recomendado)
1. Crie um novo repositório no seu GitHub (ex.: `internato-go-parte8` ou utilize o repositório principal do internato).
2. No terminal, dentro desta pasta (`c:\Users\Admin\Downloads\INTERNATO GO\site_planejamento_violencia_sus`), execute:
   ```bash
   git init
   git add .
   git commit -m "feat: site interativo planejamento reprodutivo, violencia e sus (parte 8)"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/NOME_DO_REPOSITORIO.git
   git push -u origin main
   ```
3. No GitHub:
   - Vá em **Settings** > **Pages**.
   - Em **Source**, selecione **Deploy from a branch**.
   - Em **Branch**, selecione `main` e a pasta `/ (root)`.
   - Clique em **Save**.
4. Em poucos minutos o site estará disponível no endereço:
   `https://SEU_USUARIO.github.io/NOME_DO_REPOSITORIO/`

> **Nota sobre o arquivo `.nojekyll`**: Já incluído na raiz do projeto para instruir o GitHub Pages a não processar diretórios com Jekyll e servir todos os arquivos CSS, JS e imagens imediatamente.

---

## 📱 Recursos de Usabilidade & Responsividade Móvel
- **Prevenção Total de Rolagem Horizontal**: Aplicadas as propriedades `overflow-x: hidden !important;` e `overflow-x: clip;` aos elementos `html` e `body`.
- **Dimensionamento Fluido**: Todos os contêineres e imagens possuem `max-width: 100% !important;` com quebra automática de palavras (`word-wrap: break-word !important;` e `overflow-wrap: anywhere;`).
- **Barra de Navegação Superior Fixa**: Navbar fixa no topo (`position: fixed; z-index: 50;`) com compensação de padding no corpo, eliminando barras laterais e gavetas redundantes.
- **Acessibilidade Tipográfica**: Botões rápidos `A-`, `A` e `A+` na barra de navegação para alternar dinamicamente o tamanho da fonte com persistência em `localStorage`.
- **Dark & Light Mode**: Alternância suave de tema sem *Flash of Unstyled Content* (FOUC).
- **Busca Global em Tempo Real (Ctrl + K)**: Filtro instantâneo em todos os módulos e condutas clínicas.

---

## 🛠️ Ferramentas Clínicas Interativas Integradas
1. **Calculadora dos Critérios MEC (OMS / CDC / Brasil)**: Avaliação instantânea de elegibilidade para combinados, progestagênios isolados, DIU-LNG e DIU de cobre em condições críticas (enxaqueca com aura, tabagismo ≥ 35 anos, hipertensão grave, TEV prévio, câncer de mama atual e puerpério imediato).
2. **Simulador de Contracepção de Emergência**: Algoritmo decisório baseado nas horas pós-coito e no IMC da paciente (DIU TCu380A até 120h sem perda em obesas vs Acetato de Ulipristal vs Levonorgestrel).
3. **Avaliador da Janela de Oportunidade da THM**: Raciocínio fisiopatológico com base na idade (&lt; 60 anos), tempo de menopausa (&lt; 10 anos), "regra do útero" e indicação mandatória de via transdérmica.
4. **Central de Casos Clínicos (15 Casos USMLE Step 2 / Step 3)**: Questões interativas com placar ao vivo, gabarito instantâneo, fundamentação molecular/farmacológica *Ivy League* e explicação didática *🎈 Didática para Criança de 5 Anos*.
5. **Flashcards High-Yield 3D**: Cartões interativos com rotação tridimensional para memorização ativa.
6. **Visualizador Lightbox Fullscreen**: Galeria interativa com 14 imagens e diagramas em alta resolução.

---

## 🖼️ Galeria Visual (14 Imagens e Diagramas)
1. `larc_diu_implante_real.jpg` — Fotografia macro de LARCs (DIU Cobre, DIU Mirena e Implante Etonogestrel).
2. `hsg_fluoroscopia_real.jpg` — Fluoroscopia diagnóstica de histerossalpingografia (Prova de Cotte positiva).
3. `violencia_sexual_kit_pep_real.jpg` — Kit forense e PEP antirretroviral para HIV (TDF/3TC/DTG).
4. `amiu_instrumental_real.jpg` — Instrumental cirúrgico de Aspiração Manual Intrauterina (Seringa Ipas e Cânulas Karman).
5. `dexa_densitometria_real.jpg` — Varredura de densitometria óssea DEXA (T-score e risco de fratura).
6. `consulta_acolhimento_real.jpg` — Cena clínica realista de escuta qualificada e acolhimento na Atenção Primária.
7. `criterios_mec_oms_cdc_tabela.jpg` — Infográfico das 4 categorias MEC e contraindicações de combinados.
8. `contracepcao_emergencia_algoritmo.jpg` — Algoritmo temporal e ponderal de contracepção de emergência.
9. `infertilidade_4_pilares_investigacao.jpg` — Fluxograma de avaliação dos 4 pilares da infertilidade conjugal.
10. `violencia_sexual_protocolo_72h.jpg` — Protocolo integrado das 72 horas pós-violência sexual.
11. `violencia_domestica_lei_maria_penha.jpg` — Mapa da Lei Maria da Penha (5 formas de violência) e Ciclo de Walker.
12. `aborto_legal_brasil_usmle.jpg` — Comparativo das 3 hipóteses de aborto legal no Brasil vs padrão internacional.
13. `climaterio_janela_oportunidade_thm.jpg` — Infográfico da Janela de Oportunidade e Esquemas da THM.
14. `rede_cegonha_rami_linha_cuidado.jpg` — Linha de cuidado materno-infantil do SUS e Lei do Acompanhante.

---

## 🧪 Validação Automatizada
Para testar a integridade de todas as imagens, classes de CSS e seletores de script:
```bash
python scripts/verify_site.py
```
Resultado: **100% dos testes aprovados com sucesso.**
