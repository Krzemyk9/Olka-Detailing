# 🎯 Image slider drag fix

## 🧠 Problem
Slider wymaga klikania w strzałki zamiast naturalnego przeciągania (drag), co psuje UX na urządzeniach dotykowych i desktopie.

## 🏗️ Kontekst (Context)
- Komponent: `ImageSlider.tsx`
- Framework: Next.js + Tailwind CSS
- Obecny stan: Nawigacja oparta wyłącznie na `onClick`.

## 🎯 Cel
Umożliwienie użytkownikowi płynnego przeciągania slidera myszką lub palcem (swipe/drag).

## 🎬 Zachowanie (Behaviors)
- User przytrzymuje i przesuwa (drag to scroll).
- Slider płynnie podąża za ruchem kursora/palca.
- Obsługa "momentum" (opcjonalnie, dla lepszego efektu).

## ⚠️ Wymagania techniczne
- Obsługa zdarzeń `mouse` oraz `touch`.
- Płynna animacja (użycie `framer-motion` lub natywnego CSS scroll-snap).
- Brak negatywnego wpływu na wydajność (brak lagów).

## ❌ Out of scope
- Zmiana wyglądu strzałek czy kolorystyki.
- Dodawanie nowych zdjęć.

## ✅ Kryteria sukcesu (Done when):
- Slider reaguje na drag na desktopie.
- Slider obsługuje swipe na mobile.
- Nawigacja klikana nadal działa jako fallback.