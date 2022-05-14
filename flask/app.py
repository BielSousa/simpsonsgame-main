from flask import Flask, render_template, request, jsonify
import json
import pandas as pd
import random
import pickle
from preprocessing import Preprocessing

mbarney = pickle.load(open('barney.pickle', 'rb'))
mflint = pickle.load(open('flint.pickle', 'rb') )
vec = pickle.load(open('vec.pickle', 'rb') )

df_frases = pd.read_excel('teste.xlsx')

database = {
    'nomeJogador':'',
    'avatar':'',
    'oponent':'',
}

app = Flask(__name__)

@app.route("/")
def hello_world():
    return render_template('home.html')

@app.route("/P_avatar")
def P_avatar():
    return render_template('P_avatar.html')

@app.route("/M_avatar")
def M_avatar():
    return render_template('M_avatar.html')

@app.route('/game')
def game():
    avatar = f'{database["avatar"]}.png'
    oponent = f'{database["oponent"]}.jpg'
    return render_template('game.html', avatar=avatar, oponent=oponent)

@app.route('/cletus', methods=['POST'])
def cletus():
    if request.method == 'POST':
        personagem = list(df_frases['Personagem'].unique())
        palpite = personagem[random.randrange(0,len(personagem))] 
        return palpite

@app.route('/barney', methods=['POST'])
def barney():
    if request.method == 'POST':
        output = request.get_json()
        frase_processing = Preprocessing(output)
        freq_fala = vec.transform([frase_processing])
        palpite = mbarney.predict(freq_fala)[0]
        return palpite

@app.route('/flint', methods=['POST'])
def flint():
    if request.method == 'POST':
        output = request.get_json()
        frase_processing = Preprocessing(output)
        freq_fala = vec.transform([frase_processing])
        palpite = mflint.predict(freq_fala)[0]
        return palpite

@app.route('/frase-autor')
def frase_autor():
    frasenum = random.randrange(0,len(df_frases['Falas']))
    autor = df_frases['Personagem'][frasenum]
    fala = df_frases['Falas'][frasenum]
    return jsonify(fala, autor)

@app.route('/db',methods=['GET', 'POST'])
def df():
    if request.method == 'POST':
        output = request.get_json()
        database[list(output.keys())[0]] = list(output.values())[0]
        return jsonify(database)
    else:
        return jsonify(database)

@app.route('/ganhou')
def ganhou():
    return render_template('ganhou.html') 

@app.route('/perdeu')
def perdeu():
      return render_template('perdeu.html') 

@app.route('/empate')
def empate():
    return render_template('empate.html')

if __name__ == '__main__':
    app.run()