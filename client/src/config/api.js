export default {
  baseUrl: "http://localhost:3000/api/",
  resources: {
    Postes: {
      controller: "postes"
    },
    Operators: {
      controller: "operators"
    },
    Products: {
      controller: 'products'
    },
    Items: {
      controller: 'items'
    },
    OperatorsPostes: {
      controller: 'operators_postes'
    }
  }
};
