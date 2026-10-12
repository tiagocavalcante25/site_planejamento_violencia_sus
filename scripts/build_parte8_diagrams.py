"""
build_parte8_diagrams.py - Gerador de Infográficos Médicos de Alta Definição
Parte 8: Planejamento Reprodutivo, Violência contra a Mulher, Bioética e SUS
Padronizado para Internato GO / USMLE / FEBRASGO / Ministério da Saúde / ACOG
"""

import os
import sys
from PIL import Image, ImageDraw, ImageFont

# Garante codificação UTF-8 no stdout
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

IMG_DIR = r"c:\Users\Admin\Downloads\INTERNATO GO\site_planejamento_violencia_sus\assets\img"
os.makedirs(IMG_DIR, exist_ok=True)

# Fontes do Windows
FONT_BOLD = r"C:\Windows\Fonts\segoeuib.ttf"
FONT_REG = r"C:\Windows\Fonts\segoeui.ttf"
FONT_ITALIC = r"C:\Windows\Fonts\segoeuii.ttf"

def get_font(size, bold=False, italic=False):
    path = FONT_BOLD if bold else (FONT_ITALIC if italic else FONT_REG)
    try:
        return ImageFont.truetype(path, size)
    except:
        return ImageFont.load_default()

def draw_header(draw, width, title, subtitle, badge_text="PLANEJAMENTO • BIOÉTICA • SUS"):
    draw.rectangle([0, 0, width, 110], fill="#0f172a")
    draw.rectangle([0, 106, width, 110], fill="#0284c7")
    
    # Badge
    f_badge = get_font(13, bold=True)
    draw.rounded_rectangle([30, 20, 310, 44], radius=6, fill="#0284c7")
    draw.text((42, 23), badge_text, fill="#ffffff", font=f_badge)
    
    # Título e Subtítulo
    f_title = get_font(26, bold=True)
    f_sub = get_font(15, italic=False)
    draw.text((30, 52), title, fill="#ffffff", font=f_title)
    draw.text((30, 84), subtitle, fill="#94a3b8", font=f_sub)

def draw_footer(draw, width, height, text="Guia Obstetrícia & Ginecologia Parte 8 — Portal Interativo de Decisão Clínica"):
    draw.rectangle([0, height - 35, width, height], fill="#0f172a")
    f = get_font(12, italic=True)
    draw.text((30, height - 25), text, fill="#94a3b8", font=f)

# ==============================================================================
# 1. CRITÉRIOS DE ELEGIBILIDADE CONTRACEPTIVA (MEC OMS / CDC)
# ==============================================================================
def create_diagram_criterios_mec():
    W, H = 1300, 880
    im = Image.new("RGB", (W, H), "#f8fafc")
    draw = ImageDraw.Draw(im)
    
    draw_header(draw, W, "CRITÉRIOS MÉDICOS DE ELEGIBILIDADE (MEC OMS / CDC)", 
                "Categorias 1 a 4 • Contraindicações Absolutas aos Estrogênios Combinados • Pegadinhas de Prova")
    
    # 4 Categorias MEC
    cats = [
        ("MEC 1: LIBERADO", "Sem restrições ao uso", "Pode usar com total segurança", "#10b981"),
        ("MEC 2: VANTAGENS SUPERAM", "Riscos teóricos pequenos", "Pode usar normalmente", "#0284c7"),
        ("MEC 3: RISCOS SUPERAM", "Uso normalmente não recomendado", "Evitar salvo ausência de opções", "#f59e0b"),
        ("MEC 4: CONTRAINDICAÇÃO", "Risco inaceitável à saúde", "PROIBIÇÃO ABSOLUTA!", "#ef4444")
    ]
    
    x = 30
    w_card = 295
    for tit, sub, cond, cor in cats:
        draw.rounded_rectangle([x, 130, x + w_card, 215], radius=10, fill=cor)
        draw.text((x + 15, 142), tit, fill="#ffffff", font=get_font(15, bold=True))
        draw.text((x + 15, 168), sub, fill="#ffffff", font=get_font(12))
        draw.text((x + 15, 188), cond, fill="#ffffff", font=get_font(11, italic=True))
        x += w_card + 20

    # Tabela de Contraindicações Absolutas a Estrogênio (MEC 4)
    y = 235
    draw.rounded_rectangle([30, y, 1270, 810], radius=12, fill="#ffffff", outline="#cbd5e1", width=2)
    draw.rounded_rectangle([30, y, 1270, y + 45], radius=10, fill="#1e293b")
    draw.text((45, y + 12), "CONDIÇÃO CLÍNICA", fill="#ffffff", font=get_font(14, bold=True))
    draw.text((450, y + 12), "CLASSIFICAÇÃO", fill="#ffffff", font=get_font(14, bold=True))
    draw.text((650, y + 12), "EXPLICAÇÃO FISIOPATOLÓGICA & PEGADINHA DO EXAME", fill="#ffffff", font=get_font(14, bold=True))
    
    y += 55
    linhas = [
        ("Enxaqueca com Aura (qualquer idade)", "MEC 4 (Estrogênio)", "Risco multiplicado de AVC isquêmico por vasoespasmo cortical transitório."),
        ("Tabagista ≥ 35 anos que fuma ≥ 15 cig/dia", "MEC 4 (Estrogênio)", "Efeito sinérgico potente sobre vasoconstrição e trombose arterial (IAM e AVC)."),
        ("Tabagista ≥ 35 anos que fuma < 15 cig/dia", "MEC 3 (Estrogênio)", "Pegadinha: ainda NÃO é recomendado, mas é classificado como MEC 3."),
        ("Hipertensão Arterial Grave (PAS ≥ 160 ou PAD ≥ 100)", "MEC 4 (Estrogênio)", "Risco crítico de hemorragia e dissecção vascular. Se 140-159/90-99 = MEC 3."),
        ("Histórico prévio ou ativo de TEV (TVP / TEP)", "MEC 4 (Estrogênio)", "Estado trombofílico estabelecido; estrogênio induz fatores II, VII, VIII, X."),
        ("Trombofilias conhecidas (Fator V Leiden, Protrombina)", "MEC 4 (Estrogênio)", "Hipercoagulabilidade genética primária grave."),
        ("Câncer de Mama Atual", "MEC 4 (Estrogênio e Progestagênio!)", "Pegadinha: Câncer de mama atual é MEC 4 para QUALQUER hormônio, inclusive LARC!"),
        ("Pós-parto < 21 dias sem amamentação", "MEC 4 (Estrogênio)", "Estado puerperal de hipercoagulabilidade fisiológica máxima."),
        ("Lúpus com anticorpos antifosfolípide positivos", "MEC 4 (Estrogênio)", "Risco elevadíssimo de trombose arterial e venosa maciça.")
    ]
    
    for cond, mec, exp in linhas:
        draw.text((45, y + 4), cond, fill="#0f172a", font=get_font(13, bold=True))
        draw.text((450, y + 4), mec, fill="#dc2626" if "MEC 4" in mec else "#d97706", font=get_font(13, bold=True))
        draw.text((650, y + 4), exp, fill="#475569", font=get_font(12))
        y += 38
        draw.line([30, y - 6, 1270, y - 6], fill="#f1f5f9", width=1)

    draw_footer(draw, W, H)
    im.save(os.path.join(IMG_DIR, "criterios_mec_oms_cdc_tabela.jpg"), quality=95)

# ==============================================================================
# 2. CONTRACEPÇÃO DE EMERGÊNCIA (ALGORITMO)
# ==============================================================================
def create_diagram_contracepcao_emergencia():
    W, H = 1300, 860
    im = Image.new("RGB", (W, H), "#f8fafc")
    draw = ImageDraw.Draw(im)
    
    draw_header(draw, W, "CONTRACEPÇÃO DE EMERGÊNCIA (CE): ALGORITMO & COMPARAÇÃO", 
                "DIU de Cobre de Urgência • Acetato de Ulipristal • Levonorgestrel • Impacto do Peso / Obesidade")
    
    metodos = [
        ("DIU DE COBRE (TCu380A)", "Janela de até 5 dias (120h)", "Eficácia > 99,8% (Campeão absoluto)", 
         "Citotóxico aos gametas e reação endometrial estéril", "NÃO sofre redução pelo peso ou obesidade", 
         "Permanece como método contínuo por 10 anos!", "#059669"),
        ("ACETATO DE ULIPRISTAL (30mg)", "Janela de até 5 dias (120h)", "Eficácia ~ 98-99%", 
         "Modulador de progesterona; bloqueia o pico de LH mesmo quando já começou a subir", "Mantém eficácia em IMC até 35 kg/m²", 
         "Aguardar 5 dias para reiniciar pílula regular!", "#0284c7"),
        ("LEVONORGESTREL (1,5mg)", "Janela de até 3 dias (72h) - até 120h", "Eficácia ~ 85-89% nas primeiras 72h", 
         "Agonista progestagênico; inibe subida inicial do LH (ineficaz se LH já subiu)", "Perde eficácia se peso > 70 kg ou IMC > 25-30", 
         "Disponível no SUS; repetir se vômito em até 2h!", "#d97706")
    ]
    
    x = 30
    w_card = 400
    for tit, jan, efic, mec, peso, dica, cor in metodos:
        draw.rounded_rectangle([x, 130, x + w_card, 660], radius=12, fill="#ffffff", outline="#cbd5e1", width=2)
        draw.rounded_rectangle([x, 130, x + w_card, 185], radius=10, fill=cor)
        draw.text((x + 15, 142), tit, fill="#ffffff", font=get_font(15, bold=True))
        draw.text((x + 15, 165), jan, fill="#ffffff", font=get_font(12, bold=True))
        
        y = 205
        itens = [
            ("Eficácia Clínica:", efic),
            ("Mecanismo Farmacológico:", mec),
            ("Impacto do Peso / IMC:", peso),
            ("Particularidade Prática:", dica)
        ]
        for t, d in itens:
            draw.text((x + 15, y), t, fill="#0f172a", font=get_font(13, bold=True))
            y += 20
            draw.text((x + 15, y), d, fill="#475569", font=get_font(12))
            y += 45
            
        x += w_card + 20

    # Banner Não Abortivo
    draw.rounded_rectangle([30, 680, 1270, 790], radius=10, fill="#fef2f2", outline="#ef4444", width=2)
    draw.text((45, 695), "⚠️ REGRA DE OURO DA BIOÉTICA E FARMACOLOGIA (MEMORIZAR PARA A PROVA):", fill="#b91c1c", font=get_font(14, bold=True))
    draw.text((45, 725), "NENHUM método de contracepção de emergência (DIU de cobre, Ulipristal ou Levonorgestrel) é abortivo! Eles agem impedindo", fill="#1e293b", font=get_font(13))
    draw.text((45, 750), "a ovulação ou a fertilização. Se a gravidez já estiver implantada no endométrio, o fármaco NÃO interrompe a gestação e NÃO é teratogênico.", fill="#1e293b", font=get_font(13, bold=True))

    draw_footer(draw, W, H)
    im.save(os.path.join(IMG_DIR, "contracepcao_emergencia_algoritmo.jpg"), quality=95)

# ==============================================================================
# 3. INVESTIGAÇÃO DA INFERTILIDADE (OS 4 PILARES)
# ==============================================================================
def create_diagram_infertilidade_pilares():
    W, H = 1300, 860
    im = Image.new("RGB", (W, H), "#f8fafc")
    draw = ImageDraw.Draw(im)
    
    draw_header(draw, W, "INFERTILIDADE CONJUGAL: INVESTIGAÇÃO SISTEMÁTICA INICIAL", 
                "Critérios Diagnósticos (12 meses < 35 anos ou 6 meses ≥ 35 anos) • Os 4 Pilares Fundamentais")
    
    pilares = [
        ("1. FATOR MASCULINO (40%)", "ESPERMOGRAMA COMPLETO (OMS 2021)", 
         "• Volume ≥ 1,4 mL\n• Concentração ≥ 16 milhões/mL\n• Motilidade progressiva ≥ 30%\n• Morfologia Kruger ≥ 4%\n\n⚠️ Pegadinha: se alterado, SEMPRE repetir após 4 a 12 semanas antes de fechar diagnóstico!", "#0284c7"),
        ("2. FATOR OVARIANO (30-40%)", "OVULAÇÃO & RESERVA FOLICULAR", 
         "• Progesterona no 21º dia (> 3 ng/mL confirma ovulação)\n• Hormônio Antimülleriano (AMH > 1,0-1,5 ng/mL)\n• Contagem de Folículos Antrais (CFA ≥ 5-7)\n• FSH e Estradiol no 3º dia do ciclo (< 10 UI/L)", "#059669"),
        ("3. FATOR TUBOPERITONEAL (30-40%)", "PATÊNCIA DAS TUBAS & PELVE", 
         "• HISTEROSSALPINGOGRAFIA (HSG)\n• Prova de Cotte positiva = extravasamento livre de contraste na cavidade peritoneal\n• Laparoscopia com cromotubagem (padrão-ouro para endometriose e aderências)", "#d97706"),
        ("4. FATOR UTERINO (10-15%)", "CAVIDADE ENDOMETRIAL", 
         "• USG Transvaginal e Histerossonografia\n• Histeroscopia diagnóstica e cirúrgica\n• Afastar sinéquias intrauterinas (Síndrome de Asherman), pólipos e miomas submucosos (FIGO 0, 1 e 2)", "#be123c")
    ]
    
    x = 30
    w_card = 295
    for tit, sub, desc, cor in pilares:
        draw.rounded_rectangle([x, 130, x + w_card, 680], radius=12, fill="#ffffff", outline="#cbd5e1", width=2)
        draw.rounded_rectangle([x, 130, x + w_card, 185], radius=10, fill=cor)
        draw.text((x + 12, 142), tit, fill="#ffffff", font=get_font(14, bold=True))
        draw.text((x + 12, 165), sub, fill="#ffffff", font=get_font(11, bold=True))
        
        draw.text((x + 15, 205), desc, fill="#334155", font=get_font(12))
        x += w_card + 20

    # Escadinha Terapêutica
    draw.rounded_rectangle([30, 705, 1270, 805], radius=10, fill="#f8fafc", outline="#0284c7", width=2)
    draw.text((45, 718), "🧗 ESCADINHA TERAPÊUTICA: DA BAIXA À ALTA COMPLEXIDADE:", fill="#0369a1", font=get_font(14, bold=True))
    draw.text((45, 745), "• Coito Programado + Letrozol (1ª linha para SOP)  →  • Inseminação Intrauterina (IIU) para fator masculino leve", fill="#1e293b", font=get_font(13))
    draw.text((45, 768), "• Fertilização In Vitro (FIV) para obstrução tubária bilateral  →  • ICSI para fator masculino grave (azoospermia/oligospermia grave).", fill="#1e293b", font=get_font(13, bold=True))

    draw_footer(draw, W, H)
    im.save(os.path.join(IMG_DIR, "infertilidade_4_pilares_investigacao.jpg"), quality=95)

# ==============================================================================
# 4. VIOLÊNCIA SEXUAL (PROTOCOLO 72H)
# ==============================================================================
def create_diagram_violencia_sexual():
    W, H = 1300, 860
    im = Image.new("RGB", (W, H), "#f8fafc")
    draw = ImageDraw.Draw(im)
    
    draw_header(draw, W, "ATENDIMENTO INTEGRAL À VÍTIMA DE VIOLÊNCIA SEXUAL", 
                "Linha do Tempo das 72 Horas • As 4 Profilaxias Imediatas • Cadeia de Custódia & Não Revitimização")
    
    blocos = [
        ("1. ACOLHIMENTO & ÉTICA", "• Sala privativa e escuta sem julgamento\n• Consentimento livre e esclarecido\n• NÃO exigir Boletim de Ocorrência para medicar!\n• Não revitimização (evitar perguntas invasivas)", "#be123c"),
        ("2. PREVENÇÃO DE GRAVIDEZ", "• Levonorgestrel 1,5mg VO dose única\n• Janela: até 72h (ou DIU de cobre em até 120h)\n• Teste de gravidez rápido (TIG) na admissão\n• Não tem efeito abortivo se previamente grávida", "#0284c7"),
        ("3. PEP PARA HIV (28 DIAS)", "• Iniciar o mais rápido possível (< 2h a 72h)\n• Teste rápido de HIV negativo prévio\n• Tenofovir + Lamivudina + Dolutegravir por 28 dias\n• Seguimento sorológico em 30 e 90 dias", "#d97706"),
        ("4. ISTs, HEPATITE B & TÉTANO", "• Ceftriaxona 500mg IM dose única (gonococo)\n• Azitromicina 1g VO dose única (clamídia)\n• Metronidazol 2g VO dose única (tricomoníase)\n• Vacina Hep B + HBIG se suscetível; dT/SAT", "#059669")
    ]
    
    x = 30
    w_card = 295
    for tit, desc, cor in blocos:
        draw.rounded_rectangle([x, 130, x + w_card, 480], radius=12, fill="#ffffff", outline="#cbd5e1", width=2)
        draw.rounded_rectangle([x, 130, x + w_card, 185], radius=10, fill=cor)
        draw.text((x + 15, 145), tit, fill="#ffffff", font=get_font(15, bold=True))
        
        draw.text((x + 15, 205), desc, fill="#334155", font=get_font(12))
        x += w_card + 20

    # Cadeia de Custódia Forense
    draw.rounded_rectangle([30, 505, 1270, 805], radius=12, fill="#ffffff", outline="#e2e8f0", width=2)
    draw.rounded_rectangle([30, 505, 1270, 550], radius=10, fill="#1e293b")
    draw.text((45, 517), "CADEIA DE CUSTÓDIA FORENSE & PRESERVAÇÃO DE PROVAS DE DNA", fill="#ffffff", font=get_font(15, bold=True))
    
    y = 565
    draw.text((45, y), "• Embalagem Obrigatória:", fill="#be123c", font=get_font(14, bold=True))
    draw.text((250, y), "Roupas e peças devem ser guardadas em SACOS DE PAPEL SECOS e respiráveis. NUNCA usar saco plástico hermético (mofa o DNA!).", fill="#1e293b", font=get_font(13))
    
    y += 35
    draw.text((45, y), "• Registro Ininterrupto:", fill="#0284c7", font=get_font(14, bold=True))
    draw.text((250, y), "Identificação de quem coletou, lacrou, armazenou e entregou sob carimbo, assinatura e número de controle.", fill="#1e293b", font=get_font(13))
    
    y += 35
    draw.text((45, y), "• Autonomia da Paciente:", fill="#059669", font=get_font(14, bold=True))
    draw.text((250, y), "A mulher decide se quer denunciar agora ou guardar os vestígios para eventual denúncia futura. Acolhimento médico sempre incondicional.", fill="#1e293b", font=get_font(13))

    draw_footer(draw, W, H)
    im.save(os.path.join(IMG_DIR, "violencia_sexual_protocolo_72h.jpg"), quality=95)

# ==============================================================================
# 5. VIOLÊNCIA DOMÉSTICA & LEI MARIA DA PENHA
# ==============================================================================
def create_diagram_lei_maria_penha():
    W, H = 1300, 860
    im = Image.new("RGB", (W, H), "#f8fafc")
    draw = ImageDraw.Draw(im)
    
    draw_header(draw, W, "VIOLÊNCIA DOMÉSTICA & LEI MARIA DA PENHA (LEI 11.340/2006)", 
                "As 5 Formas de Violência • Ciclo da Violência de Walker • Sinais de Alerta no Consultório e Plano de Segurança")
    
    # As 5 Formas de Violência
    formas = [
        ("1. Física", "Ofensa à integridade ou saúde corporal (socos, queimaduras, estrangulamento).", "#be123c"),
        ("2. Psicológica", "Dano emocional, controle do celular, humilhação pública, stalking e ameaças.", "#d97706"),
        ("3. Sexual", "Relação forçada, estupro marital, proibição de usar contraceptivo (stealthing).", "#881337"),
        ("4. Patrimonial", "Retenção de salário, destruição de instrumentos de trabalho, rasgar documentos.", "#0284c7"),
        ("5. Moral", "Calúnia, difamação e injúria imputadas contra a honra da mulher.", "#475569")
    ]
    
    x = 30
    w_card = 236
    for tit, desc, cor in formas:
        draw.rounded_rectangle([x, 130, x + w_card, 320], radius=10, fill="#ffffff", outline=cor, width=2)
        draw.rounded_rectangle([x, 130, x + w_card, 175], radius=8, fill=cor)
        draw.text((x + 12, 142), tit, fill="#ffffff", font=get_font(15, bold=True))
        draw.text((x + 12, 195), desc, fill="#334155", font=get_font(12))
        x += w_card + 15

    # Ciclo de Walker
    draw.rounded_rectangle([30, 345, 1270, 560], radius=12, fill="#ffffff", outline="#cbd5e1", width=2)
    draw.rounded_rectangle([30, 345, 1270, 390], radius=10, fill="#1e293b")
    draw.text((45, 357), "O CICLO DA VIOLÊNCIA DE LENORE WALKER (DINÂMICA EM 3 FASES)", fill="#ffffff", font=get_font(15, bold=True))
    
    fases = [
        ("FASE 1: CONSTRUÇÃO DA TENSÃO", "Irritabilidade, humilhações verbais, acessos de raiva. A mulher tenta 'pisar em ovos' para acalmar o agressor.", "#f59e0b"),
        ("FASE 2: INCIDENTE AGUDO / EXPLOSÃO", "Agressão física destrutiva, lesões graves. Momento de maior busca por atendimento médico de emergência.", "#dc2626"),
        ("FASE 3: LUA DE MEL / RECONCILIAÇÃO", "O agressor chora, pede perdão, traz presentes e promete mudar. A mulher desiste da separação e o ciclo reinicia com maior gravidade.", "#10b981")
    ]
    
    y = 410
    for tit, desc, cor in fases:
        draw.text((45, y), tit, fill=cor, font=get_font(13, bold=True))
        draw.text((360, y), desc, fill="#334155", font=get_font(12))
        y += 45

    # Plano de Segurança e Red Flags
    draw.rounded_rectangle([30, 580, 1270, 805], radius=12, fill="#f8fafc", outline="#0284c7", width=2)
    draw.text((45, 595), "🚨 SINAIS DE ALERTA NO CONSULTÓRIO (RED FLAGS) & PLANO DE SEGURANÇA:", fill="#0369a1", font=get_font(14, bold=True))
    draw.text((45, 625), "• Acompanhante controlador que não sai da sala e responde pela paciente: OBRIGATÓRIO examinar a paciente a sós!", fill="#b91c1c", font=get_font(13, bold=True))
    draw.text((45, 650), "• Lesões em múltiplos estágios de cicatrização ou incompatíveis com o relato (ex: hematoma na mandíbula, lesões de defesa no antebraço).", fill="#1e293b", font=get_font(13))
    draw.text((45, 675), "• Plano de Segurança: Identificar casa segura, separar bolsa de emergência com documentos originais e dinheiro reserva.", fill="#1e293b", font=get_font(13))
    draw.text((45, 700), "• Canais de Apoio: Disque 180 (Central da Mulher), DEAM (Delegacia da Mulher) e CRAS/CREAS para suporte social contínuo.", fill="#059669", font=get_font(13, bold=True))

    draw_footer(draw, W, H)
    im.save(os.path.join(IMG_DIR, "violencia_domestica_lei_maria_penha.jpg"), quality=95)

# ==============================================================================
# 6. ABORTO LEGAL: BRASIL vs USMLE
# ==============================================================================
def create_diagram_aborto_legal():
    W, H = 1300, 860
    im = Image.new("RGB", (W, H), "#f8fafc")
    draw = ImageDraw.Draw(im)
    
    draw_header(draw, W, "ABORTO PREVISTO EM LEI: MARCOS LEGAIS & MANEJO CLÍNICO", 
                "Direito Penal Brasileiro (Art. 128 CP e ADPF 54) vs USMLE (Dobbs e EMTALA) • Protocolos AMIU e Medicamentoso")
    
    # 3 Hipóteses Legais no Brasil
    hipoteses = [
        ("1. Risco de Vida Materno", "Aborto Necessário / Terapêutico (Art. 128, I, CP)\nNão há outro meio de salvar a vida da gestante (ex: choque séptico, cardiopatia grave).", "#0284c7"),
        ("2. Gravidez por Estupro", "Aborto Humanitário / Sentimental (Art. 128, II, CP)\nGravidez resultante de violência sexual com consentimento da mulher.", "#be123c"),
        ("3. Anencefalia Fetal", "Decisão do STF na ADPF 54 (2012)\nIncompatibilidade absoluta com a vida extrauterina. Exige laudo de 2 médicos.", "#059669")
    ]
    
    x = 30
    w_card = 400
    for tit, desc, cor in hipoteses:
        draw.rounded_rectangle([x, 130, x + w_card, 300], radius=10, fill="#ffffff", outline=cor, width=2)
        draw.rounded_rectangle([x, 130, x + w_card, 175], radius=8, fill=cor)
        draw.text((x + 15, 142), tit, fill="#ffffff", font=get_font(15, bold=True))
        draw.text((x + 15, 195), desc, fill="#334155", font=get_font(12))
        x += w_card + 20

    # AS 3 REGRAS DE OURO EM PROVAS BRASILEIRAS
    draw.rounded_rectangle([30, 325, 1270, 540], radius=12, fill="#fef2f2", outline="#ef4444", width=2)
    draw.rounded_rectangle([30, 325, 1270, 370], radius=10, fill="#dc2626")
    draw.text((45, 337), "⚠️ AS TRÊS GRANDES REGRAS DE OURO DO ABORTO LEGAL POR ESTUPRO NO BRASIL:", fill="#ffffff", font=get_font(15, bold=True))
    
    regras = [
        ("1. NÃO É EXIGIDO Boletim de Ocorrência (B.O.):", "A lei brasileira NÃO exige registro policial ou queixa em delegacia para o procedimento hospitalar."),
        ("2. NÃO É EXIGIDA Autorização Judicial (Alvará do Juiz):", "O médico assistente NÃO deve exigir liminar judicial. Exigir ordem do juiz é barreira indevida e ilegal!"),
        ("3. NÃO É EXIGIDO Laudo do IML:", "A palavra da mulher que relata violência tem presunção de veracidade. Equipe multiprofissional assina TCLE.")
    ]
    y = 390
    for tit, desc in regras:
        draw.text((45, y), tit, fill="#b91c1c", font=get_font(13, bold=True))
        draw.text((45, y + 20), desc, fill="#1e293b", font=get_font(12))
        y += 48

    # Manejo Clínico: Mifepristona vs AMIU
    draw.rounded_rectangle([30, 560, 1270, 805], radius=12, fill="#ffffff", outline="#cbd5e1", width=2)
    draw.rounded_rectangle([30, 560, 1270, 605], radius=10, fill="#1e293b")
    draw.text((45, 572), "MÉTODOS CLÍNICOS E CIRÚRGICOS DE INTERRUPÇÃO GESTACIONAL", fill="#ffffff", font=get_font(15, bold=True))
    
    y = 625
    draw.text((45, y), "• Mifepristona + Misoprostol (Padrão-Ouro FDA/OMS):", fill="#0284c7", font=get_font(14, bold=True))
    draw.text((480, y), "Mifepristona 200mg VO + Misoprostol 800mcg bucal/vaginal 24-48h após. Eficácia > 95% até 10-12 semanas.", fill="#334155", font=get_font(13))
    
    y += 35
    draw.text((45, y), "• Aspiração Manual Intrauterina (AMIU):", fill="#059669", font=get_font(14, bold=True))
    draw.text((480, y), "Cirúrgico padrão até 12 semanas. Menor dor, perfuração < 0,1% e taxa de sinéquias (Asherman) quase nula comparada à curetagem.", fill="#334155", font=get_font(13))
    
    y += 35
    draw.text((45, y), "• Panorama EUA / EMTALA (USMLE):", fill="#be123c", font=get_font(14, bold=True))
    draw.text((480, y), "A decisão Dobbs devolveu regulação aos estados; sob EMTALA federal, pronto-socorros são obrigados a estabilizar emergências maternas.", fill="#334155", font=get_font(13))

    draw_footer(draw, W, H)
    im.save(os.path.join(IMG_DIR, "aborto_legal_brasil_usmle.jpg"), quality=95)

# ==============================================================================
# 7. CLIMATÉRIO & JANELA DE OPORTUNIDADE DA THM
# ==============================================================================
def create_diagram_climaterio_thm():
    W, H = 1300, 860
    im = Image.new("RGB", (W, H), "#f8fafc")
    draw = ImageDraw.Draw(im)
    
    draw_header(draw, W, "CLIMATÉRIO, MENOPAUSA & TERAPIA HORMONAL (THM)", 
                "A Janela de Oportunidade • A Regra de Ouro do Útero • Vias Transdérmica vs Oral e Contraindicações")
    
    # Janela de Oportunidade
    draw.rounded_rectangle([30, 130, 630, 480], radius=12, fill="#ffffff", outline="#059669", width=2)
    draw.rounded_rectangle([30, 130, 630, 175], radius=10, fill="#059669")
    draw.text((45, 142), "JANELA DE OPORTUNIDADE (< 60 ANOS / < 10 ANOS)", fill="#ffffff", font=get_font(15, bold=True))
    
    y = 195
    itens_janela = [
        ("Momento Biológico Ideal:", "Idade < 60 anos E/OU menos de 10 anos de menopausa."),
        ("Benefício Líquido Máximo:", "Alívio dramático dos fogachos (vasomotores), melhora do sono e preservação da densidade mineral óssea."),
        ("Efeito Cardiovascular:", "Redução da mortalidade global e proteção endotelial coronariana antes da calcificação das placas."),
        ("Fora da Janela (≥ 60 anos ou > 10 anos):", "Risco supera benefícios! Risco elevado de AVC, infarto do miocárdio, trombose e demência.")
    ]
    for t, d in itens_janela:
        draw.text((45, y), t, fill="#065f46", font=get_font(13, bold=True))
        y += 20
        draw.text((45, y), d, fill="#334155", font=get_font(12))
        y += 45

    # Regras de Ouro da THM
    draw.rounded_rectangle([660, 130, 1270, 480], radius=12, fill="#ffffff", outline="#0284c7", width=2)
    draw.rounded_rectangle([660, 130, 1270, 175], radius=10, fill="#0284c7")
    draw.text((675, 142), "AS REGRAS DE OURO DA PRESCRIÇÃO DE THM", fill="#ffffff", font=get_font(15, bold=True))
    
    y = 195
    regras_thm = [
        ("A Regra do Útero Íntegro:", "Mulher COM ÚTERO: OBRIGATÓRIO associar PROGESTERONA ao estrogênio para evitar hiperplasia e câncer de endométrio!"),
        ("Mulher Histerectomizada:", "Sem útero: usa ESTROGÊNIO ISOLADO. Progesterona é dispensada e contraindicada isoladamente."),
        ("Via Transdérmica (Gel/Adesivo):", "Pula a primeira passagem hepática! Não eleva triglicerídeos nem fatores de coagulação. Escolha em hipertensas, obesas e dislipidêmicas."),
        ("Síndrome Geniturinária (GSM) Isolada:", "Estrogênio tópico vaginal de baixa dose (estriol/promestrieno). NÃO precisa de progesterona sistêmica associada!")
    ]
    for t, d in regras_thm:
        draw.text((675, y), t, fill="#0369a1", font=get_font(13, bold=True))
        y += 20
        draw.text((675, y), d, fill="#334155", font=get_font(12))
        y += 45

    # Contraindicações Absolutas
    draw.rounded_rectangle([30, 505, 1270, 805], radius=12, fill="#ffffff", outline="#ef4444", width=2)
    draw.rounded_rectangle([30, 505, 1270, 550], radius=10, fill="#dc2626")
    draw.text((45, 517), "CONTRAINDICAÇÕES ABSOLUTAS À TERAPIA HORMONAL SISTÊMICA (MEMORIZAR)", fill="#ffffff", font=get_font(15, bold=True))
    
    contra = [
        "1. Câncer de mama atual ou prévio", "2. Câncer de endométrio ou tumor estrogênio-dependente",
        "3. Sangramento pós-menopausa de causa desconhecida", "4. Tromboembolismo venoso (TVP / TEP) prévio ou ativo",
        "5. Infarto agudo do miocárdio ou AVC prévio", "6. Doença hepática aguda ou descompensada",
        "7. Porfiria cutânea tardia", "8. Lúpus com anticorpos antifosfolípide positivos"
    ]
    x_c = 45
    y_c = 570
    for i, c in enumerate(contra):
        draw.text((x_c, y_c), c, fill="#b91c1c", font=get_font(13, bold=True))
        y_c += 30
        if i == 3:
            x_c = 660
            y_c = 570

    draw.rounded_rectangle([45, 715, 1250, 785], radius=8, fill="#f8fafc", outline="#cbd5e1", width=1)
    draw.text((55, 725), "Opções Não Hormonais para Fogachos em Contraindicação:", fill="#0f172a", font=get_font(13, bold=True))
    draw.text((55, 750), "• Venlafaxina / Desvenlafaxina  • Gabapentina  • Fezolinetant (antagonista seletivo do receptor NK3 no termostato hipotalâmico).", fill="#334155", font=get_font(12))

    draw_footer(draw, W, H)
    im.save(os.path.join(IMG_DIR, "climaterio_janela_oportunidade_thm.jpg"), quality=95)

# ==============================================================================
# 8. LINHA DE CUIDADO MATERNO-INFANTIL & REDE CEGONHA / RAMI
# ==============================================================================
def create_diagram_rede_cegonha():
    W, H = 1300, 860
    im = Image.new("RGB", (W, H), "#f8fafc")
    draw = ImageDraw.Draw(im)
    
    draw_header(draw, W, "ATENÇÃO INTEGRAL NO SUS: REDE CEGONHA & LINHA DE CUIDADO", 
                "Os 4 Componentes da Rede Materno-Infantil • Estratificação de Risco • Garantia da Lei do Acompanhante")
    
    comp = [
        ("1. PRÉ-NATAL NA APS", "• Captação precoce < 12 semanas\n• Mínimo 6 consultas SUS (8 OMS)\n• Exames laboratoriais trimestrais\n• Testes rápidos sífilis e HIV\n• Vinculação à maternidade de parto", "#0284c7"),
        ("2. PARTO E NASCIMENTO", "• Acolhimento com classificação de risco\n• ACOMPANHANTE DA LEI 11.108/2005\n• Métodos não farmacológicos de dor\n• Erradicação de Kristeller e episiotomia\n• Contato pele a pele imediato", "#059669"),
        ("3. PUERPÉRIO E CRIANÇA", "• Visita domiciliar na 1ª semana\n• Consulta puerperal até 42 dias\n• Aleitamento materno exclusivo\n• Triagem neonatal (teste do pezinho)\n• Oferta ativa de contracepção", "#d97706"),
        ("4. SISTEMA LOGÍSTICO", "• SAMU Cegonha (transporte seguro)\n• Central de Regulação de Leitos\n• Vagas garantidas em UTI Neonatal\n• Casa de Apoio à Gestante (CASA)\n• Integração hospital-ambulatório", "#be123c")
    ]
    
    x = 30
    w_card = 295
    for tit, desc, cor in comp:
        draw.rounded_rectangle([x, 130, x + w_card, 480], radius=12, fill="#ffffff", outline="#cbd5e1", width=2)
        draw.rounded_rectangle([x, 130, x + w_card, 185], radius=10, fill=cor)
        draw.text((x + 12, 145), tit, fill="#ffffff", font=get_font(15, bold=True))
        
        draw.text((x + 15, 205), desc, fill="#334155", font=get_font(12))
        x += w_card + 20

    # Destaque Lei do Acompanhante e Estratificação
    draw.rounded_rectangle([30, 505, 1270, 805], radius=12, fill="#f8fafc", outline="#0284c7", width=2)
    draw.rounded_rectangle([30, 505, 1270, 550], radius=10, fill="#1e293b")
    draw.text((45, 517), "DIREITOS LEGAIS E ESTRATIFICAÇÃO DE RISCO NO SISTEMA ÚNICO DE SAÚDE (SUS)", fill="#ffffff", font=get_font(15, bold=True))
    
    y = 565
    draw.text((45, y), "• Lei Federal nº 11.108/2005 (Lei do Acompanhante):", fill="#be123c", font=get_font(14, bold=True))
    draw.text((450, y), "Direito inegociável de indicar LIVREMENTE acompanhante no trabalho de parto, parto e puerpério. O hospital NÃO pode proibir!", fill="#1e293b", font=get_font(13))
    
    y += 35
    draw.text((45, y), "• Risco Habitual vs Alto Risco:", fill="#0284c7", font=get_font(14, bold=True))
    draw.text((450, y), "Gestantes de risco habitual ficam na UBS com ESF. Alto risco vai ao Ambulatório Especializado SEM perder o vínculo na APS (cuidado compartilhado).", fill="#1e293b", font=get_font(13))
    
    y += 35
    draw.text((45, y), "• Rastreamento Universal de Osteoporose:", fill="#059669", font=get_font(14, bold=True))
    draw.text((450, y), "Densitometria Óssea (DEXA) para TODAS as mulheres com ≥ 65 anos. T-score ≤ -2,5 = Osteoporose (Alendronato 70mg/semana em jejum).", fill="#1e293b", font=get_font(13))

    draw_footer(draw, W, H)
    im.save(os.path.join(IMG_DIR, "rede_cegonha_rami_linha_cuidado.jpg"), quality=95)

if __name__ == "__main__":
    print("Gerando diagramas infográficos para Parte 8...")
    create_diagram_criterios_mec()
    create_diagram_contracepcao_emergencia()
    create_diagram_infertilidade_pilares()
    create_diagram_violencia_sexual()
    create_diagram_lei_maria_penha()
    create_diagram_aborto_legal()
    create_diagram_climaterio_thm()
    create_diagram_rede_cegonha()
    print("Todos os 8 infográficos de alta definição gerados com sucesso em:", IMG_DIR)
