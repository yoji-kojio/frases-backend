const fs = require('fs');
const path = require('path');

class Database {
  constructor(fileName) {
    this.filePath = path.join(__dirname, `${fileName}.json`);
  }

  read() {
    try {
      const data = fs.readFileSync(this.filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error(`Erro ao ler ${this.filePath}:`, error);
      return [];
    }
  }

  write(data) {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2), 'utf8');
      return true;
    } catch (error) {
      console.error(`Erro ao escrever ${this.filePath}:`, error);
      return false;
    }
  }

  findAll() {
    return this.read();
  }

  findById(id) {
    const data = this.read();
    return data.find(item => item.id === parseInt(id));
  }

  create(item) {
    const data = this.read();
    const newId = data.length > 0 ? Math.max(...data.map(i => i.id)) + 1 : 1;
    const newItem = { id: newId, ...item };
    data.push(newItem);
    this.write(data);
    return newItem;
  }

  update(id, updates) {
    const data = this.read();
    const index = data.findIndex(item => item.id === parseInt(id));
    
    if (index === -1) {
      return null;
    }

    data[index] = { ...data[index], ...updates, id: data[index].id };
    this.write(data);
    return data[index];
  }

  delete(id) {
    const data = this.read();
    const filteredData = data.filter(item => item.id !== parseInt(id));
    
    if (data.length === filteredData.length) {
      return false;
    }

    this.write(filteredData);
    return true;
  }
}

module.exports = Database;

