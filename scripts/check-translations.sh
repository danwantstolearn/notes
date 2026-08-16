#!/usr/bin/env bash
# ============================================================
# check-translations.sh — Kiểm tra độ phủ bản dịch vi/en
#
# Với mỗi file .md trong content/:
#   - Có `lang: vi|en` không? (không có -> bỏ qua)
#   - Có khai báo `altLang` trỏ tới bản dịch không?
#   - File bản dịch có tồn tại không? Ngôn ngữ có đúng chiều không?
#
# Chạy:  bash scripts/check-translations.sh
# Không block (exit 0) — chỉ in cảnh báo. Dùng `--strict` để exit 1 khi thiếu.
# ============================================================
set -uo pipefail

STRICT=0
[ "${1:-}" = "--strict" ] && STRICT=1

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
CONTENT="$ROOT/content"

if [ ! -d "$CONTENT" ]; then
  echo "❌ Không thấy thư mục content/ tại $CONTENT"
  exit 1
fi

missing=()   # thiếu altLang
broken=()    # altLang trỏ tới file không tồn tại
wronglang=() # altLang tồn tại nhưng lang không phải chiều ngược lại
total_vi=0
total_en=0

while IFS= read -r -d '' f; do
  rel="${f#"$CONTENT"/}"
  fm="$(sed -n '/^---$/,/^---$/p' "$f")"
  lang="$(printf '%s\n' "$fm" | grep -E '^lang:' | head -1 | sed -E 's/^lang:[[:space:]]*//; s/^["'"'"']|["'"'"']$//g')"
  alt="$(printf '%s\n' "$fm" | grep -E '^altLang:' | head -1 | sed -E 's/^altLang:[[:space:]]*//; s/^["'"'"']|["'"'"']$//g')"

  [ -z "$lang" ] && continue
  case "$lang" in
    vi) total_vi=$((total_vi + 1)) ;;
    en) total_en=$((total_en + 1)) ;;
    *) continue ;;
  esac

  if [ -z "$alt" ]; then
    missing+=("$rel  (lang=$lang, không khai báo altLang)")
    continue
  fi

  # altLang "/" -> index.md; còn lại bỏ dấu / đầu/cuối + đuôi .md nếu có
  target="${alt#/}"
  target="${target%/}"
  [ -z "$target" ] && target="index"
  target="${target%.md}"
  target_file="$CONTENT/$target.md"

  if [ ! -f "$target_file" ]; then
    broken+=("$rel  ->  altLang /$target  (file không tồn tại)")
    continue
  fi

  # Kiểm tra chiều ngôn ngữ
  tlang="$(sed -n '/^---$/,/^---$/p' "$target_file" | grep -E '^lang:' | head -1 | sed -E 's/^lang:[[:space:]]*//; s/^["'"'"']|["'"'"']$//g')"
  expected="vi"; [ "$lang" = "vi" ] && expected="en"
  if [ -n "$tlang" ] && [ "$tlang" != "$expected" ]; then
    wronglang+=("$rel  ->  /$target  (lang=$tlang, mong đợi $expected)")
  fi
done < <(find "$CONTENT" -name '*.md' -print0 | sort -z)

echo "=============================================="
echo " Kiểm tra bản dịch — content/"
echo "   Tổng: $((total_vi + total_en)) bài (vi: $total_vi, en: $total_en)"
echo "=============================================="

issues=0
if [ ${#missing[@]} -gt 0 ]; then
  echo ""
  echo "⚠️  Chưa có bản dịch (thiếu altLang): ${#missing[@]}"
  for m in "${missing[@]}"; do echo "   - $m"; done
  issues=$((issues + ${#missing[@]}))
fi

if [ ${#broken[@]} -gt 0 ]; then
  echo ""
  echo "🔗 altLang trỏ tới file không tồn tại (link chết): ${#broken[@]}"
  for b in "${broken[@]}"; do echo "   - $b"; done
  issues=$((issues + ${#broken[@]}))
fi

if [ ${#wronglang[@]} -gt 0 ]; then
  echo ""
  echo "🔀 altLang trỏ đúng file nhưng sai chiều ngôn ngữ: ${#wronglang[@]}"
  for w in "${wronglang[@]}"; do echo "   - $w"; done
  issues=$((issues + ${#wronglang[@]}))
fi

echo ""
if [ "$issues" -eq 0 ]; then
  echo "✅ Tất cả $((total_vi + total_en)) bài đã có bản dịch đầy đủ, không link hỏng."
else
  echo "⚠️  Tổng cộng $issues vấn đề cần xem."
  [ "$STRICT" = 1 ] && exit 1
fi
exit 0
