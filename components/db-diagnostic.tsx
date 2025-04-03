"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, AlertCircle, CheckCircle, Database } from "lucide-react"

export function DbDiagnostic() {
  const [isLoading, setIsLoading] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [results, setResults] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const runDiagnostic = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch("/api/db-check")

      if (!response.ok) {
        throw new Error(`API returned ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      setResults(data)
    } catch (err) {
      console.error("Diagnostic error:", err)
      setError(err instanceof Error ? err.message : String(err))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Database Diagnostic
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={runDiagnostic} disabled={isLoading} className="w-full">
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Running Diagnostic...
            </>
          ) : (
            "Run Database Diagnostic"
          )}
        </Button>

        {error && (
          <div className="bg-red-50 text-red-800 p-3 rounded-md flex items-center gap-2 text-sm">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {results && (
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2">
              <span className="font-medium">Database Connection:</span>
              {results.databaseConnection ? (
                <span className="text-green-600 flex items-center gap-1">
                  <CheckCircle className="h-4 w-4" /> Connected
                </span>
              ) : (
                <span className="text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" /> Not Connected
                </span>
              )}
            </div>

            <div>
              <span className="font-medium">Database URL:</span>
              <div className="text-xs bg-muted p-2 rounded mt-1 break-all">{results.databaseUrl}</div>
            </div>

            <div>
              <span className="font-medium">Schema Info:</span>
              <div className="text-xs bg-muted p-2 rounded mt-1">{results.schemaInfo}</div>
            </div>

            <div>
              <span className="font-medium">Required Tables:</span>
              <ul className="mt-1 space-y-1">
                {results.tables &&
                  Object.entries(results.tables).map(([table, exists]) => (
                    <li key={table} className="flex items-center gap-2">
                      {exists ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-red-600" />
                      )}
                      <span>
                        {table}: {exists ? "Exists" : "Missing"}
                      </span>
                    </li>
                  ))}
              </ul>
            </div>

            <div>
              <span className="font-medium">Environment:</span>
              <div className="text-xs bg-muted p-2 rounded mt-1">NODE_ENV: {results.nodeEnv}</div>
            </div>

            <div className="text-xs text-muted-foreground">
              Diagnostic run at: {new Date(results.timestamp).toLocaleString()}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

