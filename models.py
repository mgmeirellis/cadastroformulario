from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Funcionario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    salario = db.Column(db.Float, nullable=False)
    sexo = db.Column(db.String(1), nullable=False)

    def __repr__(self):
        return f'<Funcionario {self.nome}>'
