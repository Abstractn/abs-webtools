export const HBS_HELPERS = {
  stringify: (obj: any): string => {
    try { return JSON.stringify(obj); }
    catch (error) { console.error(error); return JSON.stringify(error); }
  },
  parse: (jsonString: string): any => {
    try { return JSON.parse(jsonString); }
    catch (error) { console.error(error); return JSON.stringify(error); }
  },
  ifCond: (v1: string, operator: string, v2: string, options: any): any => {
    switch(operator) {
      case '==':  return (v1 == v2)  ? options.fn(this) : options.inverse(this);
      case '===': return (v1 === v2) ? options.fn(this) : options.inverse(this);
      case '!=':  return (v1 != v2)  ? options.fn(this) : options.inverse(this);
      case '!==': return (v1 !== v2) ? options.fn(this) : options.inverse(this);
      case '<':   return (v1 < v2)   ? options.fn(this) : options.inverse(this);
      case '<=':  return (v1 <= v2)  ? options.fn(this) : options.inverse(this);
      case '>':   return (v1 > v2)   ? options.fn(this) : options.inverse(this);
      case '>=':  return (v1 >= v2)  ? options.fn(this) : options.inverse(this);
      case '&&':  return (v1 && v2)  ? options.fn(this) : options.inverse(this);
      case '||':  return (v1 || v2)  ? options.fn(this) : options.inverse(this);
      default:    return options.inverse(this);
    }
  },
}