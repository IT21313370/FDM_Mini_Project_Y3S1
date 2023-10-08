from flask import Flask, jsonify, request
from flask_cors import CORS
import numpy as np
import pickle

app = Flask(__name__)
CORS(app)

model = pickle.load(open('model.pkl', 'rb'))

@app.route('/predict', methods=['POST', 'GET'])
def predict():
    if request.method == 'GET':
        # Access query parameters from the URL
        city_development_index = request.args.get('city_development_index', 0.1)
        relevant_experience = request.args.get('relevant_experience', 'No')
        education_level = request.args.get('education_level', 'graduate')
        total_experience = request.args.get('total_experience', 0)
        last_new_job_gap = request.args.get('last_new_job_gap', 0)

        print("Received city_development_index:", city_development_index)
        print("Received relevant_experience:", relevant_experience)
        print("Received education_level:", education_level)
        print("Received total_experience:", total_experience)
        print("Received last_new_job_gap:", last_new_job_gap)

        # Perform any data preprocessing here if needed

        # Example: Convert relevant_experience to 1 for 'Yes' and 0 for 'No'
        relevant_experience = 1 if relevant_experience == 'Yes' else 0

        # Example: Convert education_level to a numeric value
        education_mapping = {
            'graduate': 0,
            'masters': 1,
            'high_school': 2,
            'phd': 3,
            'primary_school': 4
        }
        education_level = education_mapping.get(education_level, 0)

        # Prepare input features for prediction
        input_features = np.array([[
            city_development_index,
            relevant_experience,
            education_level,
            total_experience,
            last_new_job_gap
        ]])

        # Make the prediction
        prediction = model.predict_proba(input_features)
        output = round(prediction[0][1], 2)

        #Assuming data.prediction contains the probability score from your API response
        binary_prediction = 1 if output >= 0.5 else 0


        # Return the prediction as JSON
        response = {'prediction': binary_prediction}
        return jsonify(response)

    # elif request.method == 'POST':
    #     return jsonify("Try POST method")

# Run the Flask app
if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)
