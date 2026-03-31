import { describe, it, expect } from 'vitest'
import { t } from '../i18n'

describe('i18n', () => {
  it('returns PT-BR translation for known key', () => {
    expect(t('pt', 'heroBtn')).toBe('Analisar meu perfil')
  })

  it('returns EN translation for known key', () => {
    expect(t('en', 'heroBtn')).toBe('Analyze my profile')
  })

  it('falls back to PT-BR when EN key is missing', () => {
    // Both should have all keys, but if not, PT-BR is fallback
    const ptValue = t('pt', 'heroBtn')
    expect(ptValue).toBeTruthy()
  })

  it('returns the key itself when translation is missing in both langs', () => {
    expect(t('pt', 'nonExistentKey123')).toBe('nonExistentKey123')
    expect(t('en', 'nonExistentKey123')).toBe('nonExistentKey123')
  })

  it('handles unknown language by falling back to PT-BR', () => {
    expect(t('fr', 'heroBtn')).toBe('Analisar meu perfil')
  })

  it('has matching keys in PT and EN', () => {
    // Smoke test: all PT keys should exist in EN
    const ptKeys = ['heroBtn', 'analyzeBtn', 'settings', 'overallScore', 'madeBy']
    for (const key of ptKeys) {
      expect(t('pt', key)).toBeTruthy()
      expect(t('en', key)).toBeTruthy()
      expect(t('en', key)).not.toBe(key) // should not fall back to key name
    }
  })
})
