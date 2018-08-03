#read in the data file
digits <- read.csv(file="optdigits.tra",head=FALSE,sep=",")

#fraction of the total data to use for training
trainingFraction <- 0.3

#initialize our threshold and training vector
threshold <- 0
weightVector <- rep(list(0),64)

#set the training constant
trainingConstant <- 1

#set what number to actually learn
digitToLearn <- 1

#variable to track if the training has converged
converged <- FALSE

trainingIteration <- 0

#train by looping over the training set of data
# and adjusting the training vector and threshold
while(!converged) {
	converged <- TRUE
	for (row in 1:(nrow(digits)*trainingFraction)) {
		#strip out the last digit since that's not really part of the data
		dataRow <- digits[row,][1:64]
		
		#get the actual digit we are trying to guess
		actualDigit <- digits[row,][65]

		#get the dot product of the current row and the training vector
		val <- sum(dataRow * weightVector)
	
		#now we check if the value was above or below the threshold
		if (val < threshold) {
			#check if it was a false negative
			if (actualDigit == digitToLearn) {
				#increase the weight vector, to discourage false negatives
				weightVector <- weightVector + rep(list(trainingConstant),64) * dataRow
			
				#decrease the threshold to make it more permissive
				threshold <- threshold - trainingConstant
			
				converged <- FALSE
			}
		} else {
			#check if it was a false positive
			if (actualDigit != digitToLearn) {
				#decrease the weight vector, to discourage false negatives
				weightVector <- weightVector - rep(list(trainingConstant),64) * dataRow
			
				#increase the threshold to make it more permissive
				threshold <- threshold + trainingConstant

				converged <- FALSE
			}
		}
	}
	trainingIteration <- trainingIteration + 1

	#just quit out if the training takes longer than 20 iterations
	if (trainingIteration > 20) {
		break
	}
}
print(paste("Training converged in", trainingIteration, "iterations."));

#keep track of our score
tp <- 0
fp <- 0
fn <- 0
tn <- 0

#test the training vector with the remaining data set
for (row in (nrow(digits)*trainingFraction):nrow(digits)) {
	#strip out the last digit since that's not really part of the data
	dataRow <- digits[row,][1:64]

	#get the actual digit we are trying to guess
	actualDigit <- digits[row,][65]

	#get the dot product of the current row and the training vector
	val <- sum(dataRow * weightVector)
	
	#now we check if the value was above or below the threshold
	if (val >= threshold && actualDigit == digitToLearn) {
		#true positive
		tp <- tp + 1
	} else if (val < threshold && actualDigit != digitToLearn) {
		#true negative
		tn <- tn + 1
	} else if (val < threshold) {
		#we got a false negative
		fn <- fn + 1
	} else {
		fp <- fp + 1
	}
}

print(paste("True Positives", tp));
print(paste("True Negatives", tn));
print(paste("False Positives", fp));
print(paste("False Negatives", fn));
print(paste("Overall Accuracy:", (tp + tn) * 100 / (tp + tn + fp + fn), "%"));
