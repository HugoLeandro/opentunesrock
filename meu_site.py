from flask import Flask, render_template
from flask import Flask, render_template

app = Flask(__name__)
# route -> hashtagtreinamentos.com/
# função -> o que você quer exibir naquela página
# template

@app.route("/")
def homepage():
    return render_template("index.html")


# colocar o site no ar
if __name__ == "__main__":
    app.run(debug=True)
