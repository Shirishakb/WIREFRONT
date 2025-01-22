from flask import Flask, request, jsonify

app = Flask(__name__)

users = {}

print("line 7")

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    print(f"data: {data}")
    print(f"username: {username}")
    print(f"password: {password}")
    #import pdb; pdb.set_trace()
    return jsonify({"message":"signup successful"}),201

@app.route('/user/<userId>', methods=['GET', 'DELETE'])
def get_user(userId):
    if request.method == "DELETE":
        return jsonify({"message":f"deleting, {userId}"})
    return jsonify({"message":f"hello, {userId}"})

if __name__ == '__main__': 
    app.run(debug=True)