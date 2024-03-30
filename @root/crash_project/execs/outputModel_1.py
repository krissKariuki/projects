import json
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score

# Load JSON data
with open('../files/output/data_1.json', 'r') as file:
    data = json.load(file)

# Extract features and labels
features = []
labels = []
for entry in data:
    features.append([entry['currentStake'], entry['currentFactor']])
    labels.append(1 if entry['state'] == 'pass' else 0)

# Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(features, labels, test_size=0.2, random_state=42)

# Initialize and train the model
model = LogisticRegression()
model.fit(X_train, y_train)


# Evaluate the model
predictions = model.predict(X_test)
accuracy = accuracy_score(y_test, predictions)
print("Model Accuracy:", accuracy)