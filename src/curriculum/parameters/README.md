# Parameters Module Organization

## Structure

Each module series has its own file organized by curriculum code:

- `N01_counting.js` - Counting in multiples (Years 1-5)
- `N02_readwrite.js` - Read, write, order and compare (Years 2-6)
- `N03_placevalue.js` - Place value & Roman numerals (Years 2-6)
- `N04_representation.js` - Identify, represent, estimate (Years 1-6)

## File Naming Convention

**Format**: `[SERIES_CODE]_[short_description].js`

Examples:
- ✅ `N01_counting.js`
- ✅ `C01_addition.js`
- ❌ `N01_Y1_NPV.js` (too specific)
- ❌ `counting.js` (missing series code)

## Adding a New Module Series

1. **Create file**: `parameters/[SERIES]_[name].js`
2. **Export const**: `export const [SERIES]_MODULES = { ... }`
3. **Add import** in `parameters.js`:
   ```javascript
   import { [SERIES]_MODULES } from './parameters/[SERIES]_[name].js';
   ```
4. **Merge** in MODULES object:
   ```javascript
   export const MODULES = {
       ...N01_MODULES,
       ...[SERIES]_MODULES,  // Add here
   };
   ```

## Module Definition Template

```javascript
export const [SERIES]_MODULES = {
    '[MODULE_ID]': {
        id: '[MODULE_ID]',
        name: '[MODULE_ID]: Display Name',
        description: 'Full curriculum statement',
        icon: '🔢',
        yearGroup: 'Year N',
        strand: 'Strand Name',
        substrand: 'Substrand Name',
        ref: 'N1',
        parameters: {
            1: { /* Beginning level */ },
            2: { /* Developing level */ },
            3: { /* Meeting level */ },
            4: { /* Exceeding level */ }
        }
    }
};
```

## Benefits

- **Maintainable**: ~100-300 lines per file vs 19,000+ in monolith
- **Logical**: Groups learning progressions together
- **Scalable**: Easy path to 338 curriculum modules
- **Reviewable**: Git changes isolated to relevant files
- **Consistent**: Mirrors generator organization
