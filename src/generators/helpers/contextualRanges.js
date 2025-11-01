/**
 * Contextual Ranges Helper
 *
 * Provides realistic value ranges for different objects and contexts
 * to ensure measurement questions use appropriate scales.
 *
 * This prevents unrealistic scenarios like:
 * - Ribbons measured in kilometres
 * - Pencils longer than a metre
 * - Books weighing multiple kilograms
 */

/**
 * Realistic ranges for common objects by measurement type
 * Each entry defines min/max values and appropriate units
 */
export const CONTEXTUAL_RANGES = {
    length: {
        // Small objects (cm range)
        'pencil': { min: 10, max: 25, unit: 'cm', preferredUnit: 'cm' },
        'eraser': { min: 2, max: 6, unit: 'cm', preferredUnit: 'cm' },
        'crayon': { min: 8, max: 12, unit: 'cm', preferredUnit: 'cm' },
        'book': { min: 15, max: 35, unit: 'cm', preferredUnit: 'cm' },
        'ruler': { min: 15, max: 30, unit: 'cm', preferredUnit: 'cm' },
        'ribbon': { min: 20, max: 200, unit: 'cm', preferredUnit: 'cm' },
        'string': { min: 30, max: 300, unit: 'cm', preferredUnit: 'cm' },
        'shoelace': { min: 40, max: 120, unit: 'cm', preferredUnit: 'cm' },
        'finger': { min: 5, max: 10, unit: 'cm', preferredUnit: 'cm' },
        'hand span': { min: 10, max: 20, unit: 'cm', preferredUnit: 'cm' },

        // Medium objects (cm to m range)
        'desk': { min: 60, max: 150, unit: 'cm', preferredUnit: 'cm' },
        'table': { min: 80, max: 200, unit: 'cm', preferredUnit: 'cm' },
        'door': { min: 180, max: 220, unit: 'cm', preferredUnit: 'cm' },
        'rope': { min: 100, max: 500, unit: 'cm', preferredUnit: 'cm' },
        'garden path': { min: 2, max: 20, unit: 'm', preferredUnit: 'm' },
        'room width': { min: 2, max: 6, unit: 'm', preferredUnit: 'm' },
        'room length': { min: 3, max: 8, unit: 'm', preferredUnit: 'm' },
        'corridor': { min: 5, max: 30, unit: 'm', preferredUnit: 'm' },

        // Large objects (m to km range)
        'car': { min: 3, max: 5, unit: 'm', preferredUnit: 'm' },
        'bus': { min: 8, max: 15, unit: 'm', preferredUnit: 'm' },
        'building height': { min: 5, max: 50, unit: 'm', preferredUnit: 'm' },
        'playground': { min: 20, max: 100, unit: 'm', preferredUnit: 'm' },
        'football pitch': { min: 90, max: 120, unit: 'm', preferredUnit: 'm' },
        'park': { min: 100, max: 1000, unit: 'm', preferredUnit: 'm' },
        'distance to shop': { min: 200, max: 2000, unit: 'm', preferredUnit: 'm' },
        'walk to school': { min: 500, max: 3000, unit: 'm', preferredUnit: 'm' },
        'village': { min: 1, max: 5, unit: 'km', preferredUnit: 'km' },
        'town': { min: 2, max: 10, unit: 'km', preferredUnit: 'km' }
    },

    mass: {
        // Very light objects (g range, < 50g)
        'coin': { min: 3, max: 10, unit: 'g', preferredUnit: 'g' },
        'feather': { min: 1, max: 3, unit: 'g', preferredUnit: 'g' },
        'paper clip': { min: 1, max: 2, unit: 'g', preferredUnit: 'g' },
        'pencil': { min: 5, max: 15, unit: 'g', preferredUnit: 'g' },
        'eraser': { min: 10, max: 30, unit: 'g', preferredUnit: 'g' },
        'letter': { min: 20, max: 50, unit: 'g', preferredUnit: 'g' },

        // Light objects (g range, 50-500g)
        'apple': { min: 100, max: 250, unit: 'g', preferredUnit: 'g' },
        'orange': { min: 100, max: 300, unit: 'g', preferredUnit: 'g' },
        'banana': { min: 100, max: 200, unit: 'g', preferredUnit: 'g' },
        'book': { min: 200, max: 600, unit: 'g', preferredUnit: 'g' },
        'textbook': { min: 400, max: 800, unit: 'g', preferredUnit: 'g' },
        'toy car': { min: 50, max: 200, unit: 'g', preferredUnit: 'g' },

        // Medium objects (g to kg range, 500g-5kg)
        'bag of sugar': { min: 1, max: 2, unit: 'kg', preferredUnit: 'kg' },
        'bag of flour': { min: 1, max: 2, unit: 'kg', preferredUnit: 'kg' },
        'laptop': { min: 1, max: 3, unit: 'kg', preferredUnit: 'kg' },
        'watermelon': { min: 2, max: 8, unit: 'kg', preferredUnit: 'kg' },
        'school bag': { min: 2, max: 6, unit: 'kg', preferredUnit: 'kg' },
        'cat': { min: 3, max: 7, unit: 'kg', preferredUnit: 'kg' },
        'dog': { min: 5, max: 40, unit: 'kg', preferredUnit: 'kg' },

        // Heavy objects (kg range, > 5kg)
        'bag of apples': { min: 1, max: 3, unit: 'kg', preferredUnit: 'kg' },
        'box of books': { min: 5, max: 20, unit: 'kg', preferredUnit: 'kg' },
        'parcel': { min: 1, max: 10, unit: 'kg', preferredUnit: 'kg' },
        'suitcase': { min: 10, max: 30, unit: 'kg', preferredUnit: 'kg' },
        'child': { min: 15, max: 50, unit: 'kg', preferredUnit: 'kg' },
        'adult': { min: 50, max: 100, unit: 'kg', preferredUnit: 'kg' },
        'bicycle': { min: 8, max: 15, unit: 'kg', preferredUnit: 'kg' }
    },

    capacity: {
        // Very small containers (ml range, < 100ml)
        'spoon': { min: 10, max: 20, unit: 'ml', preferredUnit: 'ml' },
        'teaspoon': { min: 5, max: 5, unit: 'ml', preferredUnit: 'ml' },
        'tablespoon': { min: 15, max: 15, unit: 'ml', preferredUnit: 'ml' },
        'egg cup': { min: 40, max: 60, unit: 'ml', preferredUnit: 'ml' },

        // Small containers (ml range, 100-1000ml)
        'cup': { min: 200, max: 300, unit: 'ml', preferredUnit: 'ml' },
        'mug': { min: 250, max: 400, unit: 'ml', preferredUnit: 'ml' },
        'glass': { min: 200, max: 350, unit: 'ml', preferredUnit: 'ml' },
        'water bottle': { min: 500, max: 1000, unit: 'ml', preferredUnit: 'ml' },
        'bottle': { min: 250, max: 1000, unit: 'ml', preferredUnit: 'ml' },
        'juice carton': { min: 200, max: 1000, unit: 'ml', preferredUnit: 'ml' },
        'can': { min: 330, max: 500, unit: 'ml', preferredUnit: 'ml' },

        // Medium containers (l range, 1-20l)
        'jug': { min: 1, max: 3, unit: 'l', preferredUnit: 'l' },
        'teapot': { min: 1, max: 2, unit: 'l', preferredUnit: 'l' },
        'kettle': { min: 1, max: 2, unit: 'l', preferredUnit: 'l' },
        'bucket': { min: 5, max: 15, unit: 'l', preferredUnit: 'l' },
        'watering can': { min: 3, max: 10, unit: 'l', preferredUnit: 'l' },
        'fish tank': { min: 10, max: 100, unit: 'l', preferredUnit: 'l' },

        // Large containers (l range, > 20l)
        'bath': { min: 80, max: 200, unit: 'l', preferredUnit: 'l' },
        'paddling pool': { min: 100, max: 500, unit: 'l', preferredUnit: 'l' },
        'water tank': { min: 50, max: 300, unit: 'l', preferredUnit: 'l' },
        'swimming pool': { min: 20000, max: 80000, unit: 'l', preferredUnit: 'l' },
        'pond': { min: 500, max: 5000, unit: 'l', preferredUnit: 'l' }
    }
};

/**
 * Get a random value within the realistic range for an object
 * @param {string} object - The object name (e.g., 'pencil', 'ribbon')
 * @param {string} measureType - The measurement type ('length', 'mass', 'capacity')
 * @returns {Object} { value, unit, object } or null if not found
 */
export function getRealisticValue(object, measureType) {
    const objectData = CONTEXTUAL_RANGES[measureType]?.[object];

    if (!objectData) {
        return null;
    }

    const { min, max, unit } = objectData;
    const value = Math.floor(Math.random() * (max - min + 1)) + min;

    return {
        value,
        unit,
        object
    };
}

/**
 * Get all available objects for a measurement type
 * @param {string} measureType - The measurement type ('length', 'mass', 'capacity')
 * @returns {Array<string>} Array of object names
 */
export function getAvailableObjects(measureType) {
    return Object.keys(CONTEXTUAL_RANGES[measureType] || {});
}

/**
 * Get objects appropriate for a specific unit
 * @param {string} measureType - The measurement type
 * @param {string} unit - The unit (e.g., 'cm', 'kg', 'ml')
 * @returns {Array<string>} Array of object names appropriate for that unit
 */
export function getObjectsForUnit(measureType, unit) {
    const objects = CONTEXTUAL_RANGES[measureType] || {};
    return Object.keys(objects).filter(obj => objects[obj].preferredUnit === unit);
}

/**
 * Generate two different objects with realistic values in the same or different units
 * @param {string} measureType - The measurement type
 * @param {string} unit1 - First unit (optional, will choose appropriate unit)
 * @param {string} unit2 - Second unit (optional, will choose appropriate unit)
 * @returns {Object} { object1, value1, unit1, object2, value2, unit2 }
 */
export function generateComparisonPair(measureType, unit1 = null, unit2 = null) {
    const allObjects = getAvailableObjects(measureType);

    if (allObjects.length < 2) {
        return null;
    }

    // If units specified, filter objects for those units
    let availableObjects1 = unit1 ? getObjectsForUnit(measureType, unit1) : allObjects;
    let availableObjects2 = unit2 ? getObjectsForUnit(measureType, unit2) : allObjects;

    // Ensure we have options
    if (availableObjects1.length === 0) availableObjects1 = allObjects;
    if (availableObjects2.length === 0) availableObjects2 = allObjects;

    // Pick two different objects
    const object1 = availableObjects1[Math.floor(Math.random() * availableObjects1.length)];
    let object2 = availableObjects2[Math.floor(Math.random() * availableObjects2.length)];

    // Ensure they're different
    let attempts = 0;
    while (object1 === object2 && attempts < 10) {
        object2 = availableObjects2[Math.floor(Math.random() * availableObjects2.length)];
        attempts++;
    }

    const data1 = getRealisticValue(object1, measureType);
    const data2 = getRealisticValue(object2, measureType);

    if (!data1 || !data2) {
        return null;
    }

    return {
        object1: data1.object,
        value1: data1.value,
        unit1: data1.unit,
        object2: data2.object,
        value2: data2.value,
        unit2: data2.unit
    };
}

/**
 * Format an object name with appropriate article
 * @param {string} object - The object name
 * @returns {string} Object with article (e.g., "a pencil", "an apple")
 */
export function formatObjectWithArticle(object) {
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    const firstLetter = object.charAt(0).toLowerCase();

    // Objects that don't need an article
    const noArticle = ['water', 'juice', 'milk', 'car', 'laptop'];
    if (noArticle.includes(object)) {
        return object;
    }

    const article = vowels.includes(firstLetter) ? 'an' : 'a';
    return `${article} ${object}`;
}

/**
 * Get appropriate color/descriptor adjectives for objects in comparisons
 * @param {string} object - The object name
 * @returns {Array<string>} Array of appropriate descriptors
 */
export function getObjectDescriptors(object) {
    // Generic colors that work for most objects
    const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'black', 'white'];

    // Object-specific descriptors
    const specificDescriptors = {
        'ribbon': ['red', 'blue', 'green', 'yellow', 'silk', 'satin'],
        'pencil': ['red', 'blue', 'green', 'yellow', 'short', 'long'],
        'rope': ['thick', 'thin', 'long', 'short', 'blue', 'red'],
        'book': ['thick', 'thin', 'large', 'small', 'red', 'blue'],
        'bag': ['heavy', 'light', 'large', 'small', 'red', 'blue'],
        'box': ['heavy', 'light', 'large', 'small', 'red', 'blue']
    };

    return specificDescriptors[object] || colors;
}
