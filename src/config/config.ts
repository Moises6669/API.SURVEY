// logs configuration
export const log = {
  colors: {
    error: 'brightRed',
    warn: 'brightYellow',
    info: 'brightCyan',
    verbose: 'brightWhite',
    debug: 'brightBlue',
    silly: 'brightMagenta'
  },
  filename: 'debug.log',
  // priority => 0: highest 7: lowest
  levels: {
    emergency: {
      value: 'emerg', priority: 0
    },
    alert: {
      value: 'alert', priority: 1
    },
    critical: {
      value: 'crit', priority: 2
    },
    error: {
      value: 'error', priority: 3
    },
    warning: {
      value: 'warning', priority: 4
    },
    notice: {
      value: 'notice', priority: 5
    },
    info: {
      value: 'info', priority: 6
    },
    debug: {
      value: 'debug', priority: 7
    }
  }
}

// environment names
export const environments = {
    production: 'production',
    qa: 'qa',
    staging: 'staging',
    development: 'dev'
  }

// environment variables mapping
export const variables = {
    PORT: { name: 'PORT', value: 4000 },
    LOG_LEVEL: { name: 'LOG_LEVEL', value: 'debug' },
    NODE_ENV: { name: 'NODE_ENV', value: 'development' },
    DB_NAME: { name: 'DB_NAME', value: 'survey' },
    DB_URL: { name: 'DB_URL', value: 'mongodb://localhost/survey' },
    DB_PORT: { name: 'DB_PORT', value: '27017' },
    DB_USERNAME: { name: 'DB_USERNAME', value: '' },
    DB_PASSWORD: { name: 'DB_PASSWORD', value: '' },
    DB_REPLICA_SET: { name: 'DB_REPLICA_SET', value: '' },
    // REDIS_PORT: { name: 'REDIS_PORT', value: 6379 },
    // REDIS_URL: { name: 'REDIS_URL', value: 'localhost' },
    // PASSWORD_HASH: { name: 'PASSWORD_HASH', value: '052794d1b81834d4d78d2f081eb4f0d85fd148dd14f324968814324f11db24c3' },
    SERVER_API_REVISION: { name: 'SERVER_API_REVISION', value: '' },
    JOB_TYPES: { name: 'JOB_TYPES', value: '' },
    SERVER_PRIVATE_KEY: { name: 'SERVER_PRIVATE_KEY', value: '' },
    SERVER_FULLCHAIN_KEY: { name: 'SERVER_FULLCHAIN_KEY', value: '' }
  }

// application default values
export const application: any = {
    name: 'Freesy Forms'
  }

// content types header
export const contentTypes = {
  APPLICATION: {
    JAVA_ARCHIVE: 'application/java-archive',
    EXI_X12: 'application/EDI-X12',
    EDIFACT: 'application/EDIFACT',
    JAVASCRIPT: 'application/javascript',
    OCTET_STREAM: 'application/octet-stream',
    OGG: 'application/ogg',
    PDF: 'application/pdf',
    XHTML_xml: 'application/xhtml+xml',
    SHOCKWAVE: 'application/x-shockwave-flash',
    JSON: 'application/json',
    LD_JSON: 'application/ld+json',
    XML: 'application/xml',
    ZIP: 'application/zip',
    URL_ENCODED: 'application/x-www-form-urlencoded',
  },
  IMAGE: {
    GIF: 'image/gif',
    JPEG: 'image/jpeg',
    PNG: 'image/png',
    TIFF: 'image/tiff',
    VND_ICON: 'image/vnd.microsoft.icon',
    X_ICON: 'image/x-icon',
    DJVU: 'image/vnd.djvu',
    SVG_XML: 'image/svg+xml',
  },
}