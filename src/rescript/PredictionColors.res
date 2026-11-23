let getConfidenceColor = confidence =>
  switch confidence {
  | "high" => "text-green-500"
  | "medium" => "text-yellow-500"
  | "low" => "text-red-500"
  | _ => "text-red-500"
  }

let getProbabilityColor = probability =>
  if probability >= 0.6 {
    "bg-green-500"
  } else if probability >= 0.4 {
    "bg-yellow-500"
  } else {
    "bg-red-500"
  }
