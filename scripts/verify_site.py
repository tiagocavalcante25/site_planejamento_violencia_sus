#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
verify_site.py - Verificação Completa do Site de Planejamento Reprodutivo, Violência & SUS
Valida integridade de imagens, HTML, CSS, JavaScript e compatibilidade com GitHub Pages.
"""

import os
import re
import sys

# Força codificação UTF-8 no stdout para Windows
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

SITE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
INDEX_PATH = os.path.join(SITE_DIR, 'index.html')
CSS_PATH = os.path.join(SITE_DIR, 'assets', 'css', 'custom.css')
JS_PATH = os.path.join(SITE_DIR, 'assets', 'js', 'app.js')
IMG_DIR = os.path.join(SITE_DIR, 'assets', 'img')
NOJEKYLL_PATH = os.path.join(SITE_DIR, '.nojekyll')

def test_files_exist():
    print("--> 1. Verificando estrutura essencial de arquivos...")
    for path, name in [
        (INDEX_PATH, 'index.html'),
        (CSS_PATH, 'assets/css/custom.css'),
        (JS_PATH, 'assets/js/app.js'),
        (NOJEKYLL_PATH, '.nojekyll')
    ]:
        assert os.path.exists(path), f"ERRO: Arquivo {name} não encontrado em {path}!"
        print(f"    [OK] {name} presente ({os.path.getsize(path)} bytes)")

def test_images():
    print("\n--> 2. Verificando galeria de imagens e infográficos...")
    assert os.path.exists(IMG_DIR), "ERRO: Diretório assets/img não existe!"
    
    with open(INDEX_PATH, 'r', encoding='utf-8') as f:
        html_content = f.read()

    # Busca todas as referências assets/img/... no HTML
    found_in_html = set(re.findall(r'assets/img/([a-zA-Z0-9_\-\.]+\.jpg)', html_content))
    files_on_disk = set(f for f in os.listdir(IMG_DIR) if f.endswith('.jpg'))

    print(f"    Imagens no disco: {len(files_on_disk)}")
    print(f"    Imagens citadas no HTML: {len(found_in_html)}")

    missing_on_disk = found_in_html - files_on_disk
    assert not missing_on_disk, f"ERRO: Imagens citadas no HTML mas ausentes no disco: {missing_on_disk}"

    for img_name in files_on_disk:
        full_path = os.path.join(IMG_DIR, img_name)
        size = os.path.getsize(full_path)
        assert size > 5000, f"ERRO: Imagem {img_name} parece corrompida ou vazia ({size} bytes)"
        print(f"    [OK] {img_name:<42} ({size/1024:.1f} KB)")

def test_css_requirements():
    print("\n--> 3. Verificando diretrizes de responsividade no CSS...")
    with open(CSS_PATH, 'r', encoding='utf-8') as f:
        css = f.read()

    assert 'overflow-x: hidden !important;' in css, "ERRO: overflow-x: hidden !important ausente no CSS!"
    assert 'max-width: 100% !important;' in css, "ERRO: max-width: 100% !important ausente no CSS!"
    assert 'word-wrap: break-word !important;' in css, "ERRO: word-wrap: break-word !important ausente no CSS!"
    assert 'overflow-x: clip;' in css, "ERRO: overflow-x: clip ausente no CSS!"
    print("    [OK] Todas as regras mandatórias de responsividade e corte horizontal foram validadas no CSS.")

def test_html_js_integration():
    print("\n--> 4. Verificando IDs e integração entre HTML e JavaScript...")
    with open(INDEX_PATH, 'r', encoding='utf-8') as f:
        html = f.read()

    critical_ids = [
        'theme-toggle',
        'font-decrease', 'font-reset', 'font-increase',
        'global-search', 'no-search-results',
        'calc-mec-cond', 'calc-mec-metodo', 'calc-mec-result',
        'ce-horas', 'ce-imc', 'btn-calc-ce', 'ce-result',
        'thm-idade', 'thm-tempo', 'thm-utero', 'thm-comorb', 'btn-calc-thm', 'thm-result',
        'casos-clinicos-container', 'score-respondidos', 'score-acertos', 'score-pct',
        'flashcard-container', 'card-prev', 'card-next', 'card-counter',
        'image-modal', 'modal-img', 'modal-caption', 'modal-close', 'modal-backdrop'
    ]

    for cid in critical_ids:
        assert f'id="{cid}"' in html, f"ERRO: ID '{cid}' esperado pelo app.js não encontrado no index.html!"
        print(f"    [OK] ID #{cid} presente")

def main():
    print("================================================================")
    print("INICIANDO TESTES DO PORTAL: PLANEJAMENTO, VIOLÊNCIA & SUS")
    print("================================================================")
    test_files_exist()
    test_images()
    test_css_requirements()
    test_html_js_integration()
    print("\n================================================================")
    print("✅ SUCESSO TOTAL: 100% dos testes foram aprovados!")
    print("O site está pronto para deploy no GitHub Pages e uso em qualquer dispositivo.")
    print("================================================================")

if __name__ == '__main__':
    main()
