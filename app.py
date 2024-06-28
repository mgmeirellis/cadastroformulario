from flask import Flask, request, jsonify
from flask_cors import CORS
from models import db, Funcionario
from config import Config

app = Flask(__name__)
app.config.from_object(Config)
CORS(app)  # Habilita CORS para todos os endpoints

db.init_app(app)

# Criar as tabelas no banco de dados antes da primeira requisição
@app.before_request
def create_tables():
    db.create_all()

# Rota para listar todos os funcionários
@app.route('/funcionarios', methods=['GET'])
def get_funcionarios():
    funcionarios = Funcionario.query.all()
    return jsonify([{
        'id': f.id,
        'nome': f.nome,
        'salario': f.salario,
        'sexo': f.sexo
    } for f in funcionarios])

# Rota para adicionar um novo funcionário
@app.route('/funcionarios', methods=['POST'])
def add_funcionario():
    data = request.get_json()
    novo_funcionario = Funcionario(
        nome=data['nome'],
        salario=data['salario'],
        sexo=data['sexo']
    )
    db.session.add(novo_funcionario)
    db.session.commit()
    return jsonify({'message': 'Funcionário criado com sucesso!'}), 201

# Rota para remover todos os funcionários
@app.route('/funcionarios/remover-todos', methods=['DELETE'])
def remover_todos_funcionarios():
    try:
        db.session.query(Funcionario).delete()
        db.session.commit()
        return jsonify({'message': 'Todos os funcionários foram removidos'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)

