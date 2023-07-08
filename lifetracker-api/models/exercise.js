const db = require("../db")
const { BadRequestError } = require("../utils/errors")
const { validateFields } = require("../utils/validate")
class exercise {
  static _createPublicExercise(exercise) {
    return {
      id: exercise.id,
      user_id: exercise.user_id,
      name: exercise.name,
      category: exercise.category,
      duration: exercise.duration,
      intensity: exercise.intensity,
    }
  }
  static async create(exerciseData) {
    const { user_id, name, category, duration, intensity } = exerciseData;
    const requiredFields = ["user_id", "name", "category", "duration", "intensity"];
    validateFields({ required: requiredFields, obj: exerciseData, location: "exercise creation" })
    const result = await db.query(
      `INSERT INTO exercise (
          user_id,
          name,
          category,
          duration,
          intensity
        )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, user_id, name, category, duration, intensity`,
      [user_id, name, category, duration, intensity]
    )
    const exercise = result.rows[0]
    return this._createPublicExercise(exercise)
  }
  static async fetchExercisesByUserId(userId) {
    const result = await db.query(
        `SELECT id, user_id, name, category, duration, intensity
         FROM exercise
         WHERE user_id = $1`,
        [userId]
    )
    const exercises = result.rows;
    return exercises.map(exercise => this._createPublicExercise(exercise));
}
}
module.exports = exercise