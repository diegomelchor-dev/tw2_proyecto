from flask import Blueprint, render_template

main = Blueprint("main", __name__)

@main.route("/")
def home():
    return render_template("base.html")

@main.route("/carrusel")
def carrusel():
    return render_template("carrusel/carrusel.html")

@main.route("/slider")
def slider():
    return render_template("slider/slider.html")